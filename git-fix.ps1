# Check if Git is installed
$gitPath = "C:\Program Files\Git\cmd"
$gitBinPath = "C:\Program Files\Git\bin"

if (Test-Path $gitPath) {
    Write-Host "Git found at $gitPath"
    
    # Add Git to PATH if not already there
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", [EnvironmentVariableTarget]::User)
    if (-not ($currentPath -split ';' -contains $gitPath)) {
        $newPath = "$currentPath;$gitPath"
        [Environment]::SetEnvironmentVariable("PATH", $newPath, [EnvironmentVariableTarget]::User)
        Write-Host "Added Git to your user PATH"
    }

    if (-not ($currentPath -split ';' -contains $gitBinPath)) {
        $newPath = "$($env:PATH);$gitBinPath"
        [Environment]::SetEnvironmentVariable("PATH", $newPath, [EnvironmentVariableTarget]::User)
        Write-Host "Added Git bin to your user PATH"
    }
    
    # Set the path for the current session
    $env:Path = [Environment]::GetEnvironmentVariable("PATH", [EnvironmentVariableTarget]::User)
    
    # Test Git
    try {
        $version = & "$gitPath\git.exe" --version
        Write-Host "Git is working: $version"
    } catch {
        Write-Host "Error running Git: $_"
    }
} else {
    Write-Host "Git installation not found at expected location: $gitPath"
}

Write-Host "Close and reopen PowerShell to apply changes" 