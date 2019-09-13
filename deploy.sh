# Semvar versioning regex (https://github.com/semver/semver/issues/232)
SEMVAR="^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$"

if [[ $TRAVIS_TAG =~ $SEMVAR ]]; then
    # Decrypt the secrets file
    echo $super_secret_password | gpg --passphrase-fd 0 secrets.tar.gpg
    tar xvf secrets.tar

    # Deploy on AppEngine
    ./mvnw package appengine:stage -Pprod -DskipTests
    echo "package done"
    cd target/appengine-staging
    jar xf open-learnr-1.0.0.jar
    echo "jar extracted"
    rm -f open-learner-1.0.0.jar
    echo "removed open learner"
    ./mvnw appengine:deploy
    echo "deployed"
fi
