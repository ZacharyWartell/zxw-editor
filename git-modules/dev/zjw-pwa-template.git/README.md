
# Instructions (work-in-progress)

## See also [docs/zjw-pwa-template-man.html](docs/zjw-pwa-template-man.html)

## Prerequisites:
- [OS=Windows] install a Unix environment either WSL or MSYS2 or perhaps git-bash
- [OS=All] zjw-pwa-template requires the following Unix commands and CLI programs:
    - bash
    - git
    - sed
    - cygpath  # \todo this is git-bash/MSYS2 specific, what is the WSL equivalent?
    - cat /proc/sys/kernel/random/uuid
    - ...others...
- zjw-pwa-template requires the file system storing a project using zjw-pwa-template supports symbolic links
    - [OS=WINDOWS] Due to Microsoft OS's unusual security features, zjw-pwa-template scripts has to prompt you for permission when the script needs to create a symlink
    - [STORAGE=Google Drive] Google Drive (at least on Microsoft OS) forbids symlinks (AFIAK).  Hence for now Google Drive can't be used to store a project using zjw-pwa-template,
      without a bunch of manual workarounds...

## Initializing a new project:

$ git clone YourProjectFoo
$ cd YourProjectFoo
$ git add submodule https://gitlab.com/zachary-wartell-public/zjw-pwa-template.git git-modules/zjw-pwa-template.git
$ git-modules/zjw-pwa-template.git/scripts/zjwp-init-project

## Using after project initalization:

// For each bash shell in which you want to run the zjw-pwa-template scripts:
$ cd YourProjectFoo
$ pushd scripts; . ./zjwp/zjwp-set-path; popd
