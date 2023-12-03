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
       
       stage("Deploy") {
            steps {
                script {
                     bat 'rd /s /q C:\\path\\to\\destination\\build'
                    // Copy files (adjust the source and destination accordingly)
                    bat 'xcopy /s /e /y /i C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\reactnov\\build C:\\path\\to\\destination\\build'
                }
            }
        }
    }
}
