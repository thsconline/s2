#### Powershell Script Copyright 2024-12-28 thsconline. Not covered under MIT license.
Param (
[Parameter(Mandatory=$true)]
$PDFTemplateCode
)

chdir $PSScriptRoot


$host.ui.RawUI.WindowTitle = "thsconline admin script $PDFTemplateCode"
chdir $PSScriptRoot # change to current directory
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

try
{
	$Params = (gc ".\config_files\$PDFTemplateCode.json" | ConvertFrom-Json)
	
}
catch
{
	exit
}

## Add Dependencies, requires .NET 4.6.1

Add-Type -Path .\AngleSharp.dll -ErrorAction 'SilentlyContinue'
Add-Type -Path .\System.Text.Encoding.CodePages.dll  -ErrorAction 'SilentlyContinue'
Add-Type -Path .\System.Buffers.dll  -ErrorAction 'SilentlyContinue'
Add-Type -Path .\System.Runtime.CompilerServices.Unsafe.dll -ErrorAction 'SilentlyContinue'

## Set paramters for files - assume cloud storage is mounted as G:\
## Eventually move these to a JSON file for each paper type.

$DrivePath = $Params.DrivePath  

$PapersFile = $Params.PapersFile # use relative path
$PapersFileLeaf = "$(Split-Path -Path $PapersFile -Leaf)"
$IndexFile = "$(Split-Path -Path $PapersFile -Parent)\index.html"

$WithSolutionsSuffix  = $Params.WithSolutionsSuffix
$WithoutSolutionsSuffix = $Params.WithoutSolutionsSuffix 
## Assume format [School] [Year] [Suffix].pdf


#$PDFTemplateCode = "5348"  ## set this to match what translates text to file name in GAS

## Get list of schools. This script will only work for where subdirectories are used to separate schools. 

$Schools = (gci $DrivePath -Directory | sort name).name
$Papers = $Schools | % {(gci "$($DrivePath)\$($_)" | where {$_.name -match "[A-z ]{3,} (19|20)[0-9]{2} ($WithoutSolutionsSuffix|$WithSolutionsSuffix)"} | sort name).name}

$PapersFormatted = ($Papers -replace $WithSolutionsSuffix, "w. sol" -replace $WithoutSolutionsSuffix, "").trim()


# Now to update the papers file with the new list content. We only index those that are the exact correct format.

$PapersHTMLBlob = gc -Encoding UTF8 $PapersFile
$PapersHTMLParser = New-Object AngleSharp.Html.Parser.HtmlParser
$PapersHTMLSitePage = $PapersHTMLParser.ParseDocument($PapersHTMLBlob)

$ContentAllBlock = $PapersHTMLSitePage.getElementById("content-all");
$TableBody = $ContentAllBlock.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
$TableRows = $TableBody.getElementsByTagName("tr");

# Remove rows first 
$TableRows | % {
		$_.Remove() | Out-Null
}
$Schools | % {
	$SchoolName = $_;
	
	$PaperSet = $PapersFormatted | where {$_ -match "^$SchoolName (19|20)[0-9]{2}"}
	Write-Host -f Cyan "Processing papers for $($SchoolName)"
	
	### Logic to add paragraph block
	$PaperSet
	if(($Paperset | Measure).count -eq 0)
	{
	}
	else
	{
	$PapersetA = "<tr><td>$($SchoolName)<br />`r`n<span class=`"content`">`r`n";
	$PapersetB = ($Paperset -replace "^(.*)", '<a>$1</a>' -replace "<a>", "<a href=`"#v`" onClick=`"pdf(this, $PDFTemplateCode)`">") -join "<br />" -replace "<br />", "<br />`r`n";
	$PapersetC = "`r`n</span></td></tr>`r`n"
	
	$PapersetHTMLCode = $PapersetA + $PapersetB + $PapersetC
	
	$TableBody.InnerHTML += $PapersetHTMLCode
	}
	
}

$WriteableHTML = $TableBody.InnerHTML.trim() -replace "^<tr.*gskip.*/tr>","" -replace "<!--.*-->", "" -replace "<br>","<br />" -replace "onclick", "onClick"
$WriteableHTMLBlob = $WriteableHTML -split "`n"
$StartContentAnchor = ($PapersHTMLBlob | select-string "<!-- BEGIN CONTENT $($PDFTemplateCode) --->").linenumber-1
$EndContentAnchor = ($PapersHTMLBlob | select-string "<!-- END CONTENT $($PDFTemplateCode) --->").linenumber-1

$EndAnchor = ($PapersHTMLBlob | measure).count-1; ## assume at least 1 line 

$NewHTMLBlob = $PapersHTMLBlob[0..$StartContentAnchor] +  $WriteableHTML.trim() + $PapersHTMLBlob[$EndContentAnchor..$EndAnchor]

Set-Content -Encoding UTF8 $PapersFile -Value $NewHTMLBlob 

## Finally we update the 
if($Params.UpdateIndex)
{
	$UpdatedPapersHTMLBlob = gc -Encoding UTF8 $PapersFile
	$TotalCount = ($UpdatedPapersHTMLBlob | select-string "pdf").count
	$WSOLCount = ($UpdatedPapersHTMLBlob | select-string " w. sol").count
	
	$IndexHTMLBlob = gc -Encoding UTF8 $IndexFile
	$IndexHTMLParser = New-Object AngleSharp.Html.Parser.HtmlParser
	$IndexHTMLSitePage = $IndexHTMLParser.ParseDocument($IndexHTMLBlob)
	$CurrentCount = ($IndexHtmlsitepage.getElementById("content-all").getElementsByTagName("a") | where {$_.pathname -eq "/$($PapersFileLeaf)"}).NextElementSibling.NextElementSibling.OuterHtml
	$NewCount = "<span style=`"padding-left: 29px;`">$($TotalCount) papers online, $($WSOLCount) w. sol</span>"
	
	$NewIndexHTMLBlob = $IndexHTMLBlob -replace $CurrentCount,$NewCount
	Set-Content -Encoding UTF8 $IndexFile -Value $NewIndexHTMLBlob 
}
## Run a sync in Github Desktop / Git client to update in production.