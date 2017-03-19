# _mkproj_

#### _mkproj, 3-17-2017_

#### By _**Janek Brandt**_

## Description
_This Bash script automates the creation of a java project. It populates initial files with boilerplate, creates and populates README.md file and initializes git repository._

paste the below into the terminal

```
eval "$(curl -s https://raw.githubusercontent.com/janek-b/mkproj/master/mkproj)"
```

### Usage
```
usage: mkproj [-ha] <ProjectName> <ClassNameOne> <ClassNameTwo>

creates initial files and directories for a new java project,
populates files with initial boilerplate,
initializes git with pairs,
adds useful aliases to simplify repetitive tasks

examples

    # mkproj NewJavaProject JavaClass OtherJavaClass
    create new java project directory and populate initial files

options

    -h             print this message and exit
    -a             working alone, will not use git pair-commit.
```

### How to use
#### Install
Paste the command below into the terminal.

```
eval "$(curl -s https://raw.githubusercontent.com/janek-b/mkproj/master/mkproj)"
```

If you're running bash 4.0 or later use this command. (not default version on mac)
```
source <(curl -s https://raw.githubusercontent.com/janek-b/mkproj/master/mkproj)
```

#### Example

Running this command:
```
mkproj NewJavaProject ClassOne ClassTwo
```
Will generate this directory structure.
```
├── new-java-project/
│   ├── README.md
│   ├── .gitignore
│   ├── build.gradle
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── App.java
│   │   │   │   ├── ClassOne.java
│   │   │   │   ├── ClassTwo.java
│   │   │   │   ├── VelocityTemplateEngine.java
│   │   │   ├── resources/
│   │   │   │   ├── public/
│   │   │   │   │   ├── images/
│   │   │   │   ├── templates/
│   │   ├── test/
│   │   │   ├── java/
│   │   │   │   ├── ClassOneTest.java
│   │   │   │   ├── ClassTwoTest.java
```

#### Run
You can create a new project by using the mkproj command followed by the name of the project and any classes you want to create.

```
mkproj ProjectName ClassName
```
You can provide multiple ClassNames after the project name and it will create a .java file and matching test.java file for each.

If no .pairs file exists it will prompt to enter your names and will generate a .pairs file for you.

It will not override a project directory if it already exists.

#### Independent projects

If you are not working in pairs use the -a flag. It will retrieve the name to use in the README from your .gitconfig file.
```
mkproj -a ProjectName ClassName
```

If you want to store you projects in a location other than the Desktop create an environment variable EPICODUS_DIR for the path of the directory you want to use.
```
echo "export EPICODUS_DIR=${HOME}/code/epicodus/java" >> ~/.bash_profile
```

#### Aliases

In addition to creating new project directories it adds aliases to shorten some commands.

```
gpc  =  git-pair-commit
gpc -m "commit message"

jr   =  java -cp build/classes/main
jr App
```
The command jr allows you to run your compiled java application without moving into the build directory.



### License

Copyright (c) 2017) **_Janek Brandt_**

This software is licensed under the MIT license.
