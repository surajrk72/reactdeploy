pipeline{
    agent any
    tools {nodejs "NodeJS"}
    stages{
        stage("Install"){
            steps {
                bat "npm install"
            }
        }
        stage("Build"){
            steps {
                bat "npm run build"
            }
        }
       
        stage("Deploy"){
            steps {
                bat "rm -rf /usr/local/var/www/react-app/build"
                bat "cp -R /Users/swati/.jenkins/workspace/reactnov/build  /usr/local/var/www/react-app/build"
            }
        }
    }
}
