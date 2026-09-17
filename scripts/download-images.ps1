# Script untuk mengunduh foto berbasis Wikimedia Commons (bebas lisensi, andal).
# Menyimpan gambar secara lokal ke public/images agar aman CSP & tanpa dependensi runtime.

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$root = Split-Path -Parent $PSScriptRoot
$imgRoot = Join-Path $root "public\images"

# Peta: folder tujuan + daftar query pencarian (topik)
$topics = @(
  @{ folder = "hero";        queries = @("school building modern", "vocational school building", "school campus building") },
  @{ folder = "jurusan";     queries = @("computer network rack server room", "software developer coding screen", "car engine repair workshop", "motorcycle repair mechanic", "accounting calculator finance", "digital marketing laptop commerce") },
  @{ folder = "fasilitas";   queries = @("school classroom interior", "computer laboratory school", "library reading room school", "school sports field", "school cafeteria", "mosque building") },
  @{ folder = "galeri";      queries = @("students classroom learning", "school laboratory practical", "vocational workshop students", "school library students", "school sports students", "school graduation students", "students group project", "school auditorium hall") },
  @{ folder = "berita";      queries = @("students competition award", "students teamwork technology", "students industry visit factory", "students presentation classroom", "students coding class") },
  @{ folder = "struktur";    queries = @("business meeting office team", "school principal office") },
  @{ folder = "ekstrakurikuler"; queries = @("scouts camping students", "school band music students", "traditional dance indonesia", "basketball students school", "football futsal students", "robotics competition students", "students choir singing", "martial arts pencak silat") }
)

function Get-CommonsImageUrl {
  param([string]$Query, [int]$Limit = 4, [int]$Width = 640)
  $escaped = [uri]::EscapeDataString($Query)
  $api = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=filetype:bitmap%20$escaped&gsrlimit=$Limit&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=$Width"
  try {
    $r = curl.exe -sL -A "Mozilla/5.0 (compatible; SMKWebsiteBot/1.0)" $api
    if ($r.Length -lt 50) { return @() }
    $o = $r | ConvertFrom-Json
    $urls = @()
    foreach ($p in $o.query.pages.PSObject.Properties) {
      $u = $p.Value.imageinfo[0].thumburl
      if ($u) { $urls += $u }
    }
    return $urls
  } catch { return @() }
}

function Save-Image {
  param([string]$Url, [string]$OutPath)
  if (Test-Path $OutPath) { return $true }
  $tmp = "$OutPath.tmp"
  $code = curl.exe -sL -o $tmp -w "%{http_code}" -A "Mozilla/5.0 (compatible; SMKWebsiteBot/1.0)" $Url
  if ($code -eq "200" -and (Test-Path $tmp) -and ((Get-Item $tmp).Length -gt 5000)) {
    Move-Item -LiteralPath $tmp -Destination $OutPath -Force
    return $true
  }
  Remove-Item $tmp -Force -ErrorAction SilentlyContinue
  return $false
}

$manifest = @()
$n = 0

foreach ($topic in $topics) {
  $dir = Join-Path $imgRoot $topic.folder
  New-Item -ItemType Directory -Path $dir -Force | Out-Null

  $qi = 0
  foreach ($q in $topic.queries) {
    $qi++
    $urls = Get-CommonsImageUrl -Query $q -Limit 3
    $j = 0
    foreach ($u in $urls) {
      $j++
      # Hanya terima jpg/jpeg/png; skip format aneh (svg/tiff/webp/dll)
      if ($u -match "\.svg|\.tif|\.tiff|\.webp|\.gif") { continue }
      $ext = "jpg"
      if ($u -match "\.png") { $ext = "png" }
      $name = "$($topic.folder)-$qi-$j.$ext"
      $out = Join-Path $dir $name
      if (Save-Image -Url $u -OutPath $out) {
        $n++
        $rel = "/images/$($topic.folder)/$name"
        $manifest += [pscustomobject]@{ folder = $topic.folder; query = $q; file = $rel }
        Write-Output "OK  $rel"
      } else {
        Write-Output "SKIP $q -> $u"
      }
      Start-Sleep -Milliseconds 400
    }
    Start-Sleep -Milliseconds 300
  }
}

Write-Output "=== TOTAL DIUNDUH: $n ==="
$manifest | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath (Join-Path $root "image-manifest.json") -Encoding UTF8
Write-Output "Manifest disimpan."
