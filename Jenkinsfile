pipeline{
    agent any
    tools {nodejs "NodeJS"}
    stages{
        stage("Install"){
            steps {
                sh "npm install"
            }
        }
        stage("Build"){
            steps {
                sh "npm run build"
            }
        }
        stage("Debug") {
            steps {
                script {
                    echo "Current directory: ${pwd()}"
                    echo "PATH: ${env.PATH}"
                    // Add more debug statements as needed
                }
            }
        }
        stage("Deploy"){
            steps {
                sh "rm -rf /usr/local/var/www/react-app/build"
                sh "cp -R /Users/swati/.jenkins/workspace/reactnov/build  /usr/local/var/www/react-app/build"
            }
        }
    }
}
