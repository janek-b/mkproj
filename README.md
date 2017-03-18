# _mkproj_

#### _mkproj, 3-17-2017_

#### By _**Janek Brandt**_

## Description
_This Bash script automates the creation of a java project. It populates initial files with boilerplate, creates and populates README.md file and initializes git repository._

paste the below into the terminal

```
source <(curl -s https://raw.githubusercontent.com/janek-b/mkproj/master/mkproj)
```

### Usage
```
usage: mkproj [-hab] <ProjectName> <ClassName>

creates initial files and directories for a new java project,
populates files with initial boilerplate,
initializes git with pairs,
adds useful aliases to simplify repetative tasks

examples

    # mkproj NewJavaProject JavaClass
    create new java project directory and populate initial files

options

    -h             print this message and exit
    -a             working alone, will not use git pair-commit.
    -b             prompt to change base directory
```
### How to use
paste the below into the terminal

```
source <(curl -s https://raw.githubusercontent.com/janek-b/mkproj/master/mkproj)
```

This will load a function into the shell which will allow you to create a new project by typing.
```
mkproj ProjectName ClassName
```
If no class name is provided it will use the project name as the name for the primary class.

If no .pairs file exists it will prompt to enter partner names and will generate a .pairs file.

It will not override a project directory if it already exists.

If you are not working in a pair use the -a flag. It will retrieve the name to use from the .gitconfig file.
```
mkproj -a ProjectName ClassName
```

In addition to creating new project directories it adds aliases to shorten some comman commands.

```
gpc  =  git-pair-commit

jr   =  java -cp build/classes/main
```
The command jr allows you to run your compiled java application without moving into the build directory.



### License

Copyright (c) 2017) **_Janek Brandt_**

This software is licensed under the MIT license.
