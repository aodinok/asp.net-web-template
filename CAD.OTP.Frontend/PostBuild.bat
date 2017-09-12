ECHO OFF

setlocal enableextensions enabledelayedexpansion

set BuildType=%1
set NODE_VER=

FOR /F "tokens=*" %%F IN ('node -v') DO (
	set NODE_VER=%%F
)

IF "!NODE_VER!" == "" (
	echo Node Not Found! Please install Node.
) ELSE (
	echo Node !NODE_VER! Found
	set _NODE_VER=!NODE_VER:~1!
	for /F "tokens=1,2,3 delims=." %%a in ("!_NODE_VER!") do (
	   set /a Major=%%a
	   set /a Minor=%%b
	   set /a Revision=%%c
	)
	echo Node !Major!.!Minor!.!Revision!
	set ExpectedVersion=6
	IF !Major! GEQ !ExpectedVersion! (
		cd app
		IF !BuildType! GEQ '-p' (
			echo Building frontend app...
			npm run build
		)
	) ELSE (
		echo Node found, but only >6.0.0 is suported.
	)
)