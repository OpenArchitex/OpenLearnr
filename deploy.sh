# Semvar versioning regex (https://github.com/semver/semver/issues/232)
SEMVAR="^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$"

if [[ $TRAVIS_TAG =~ $SEMVAR ]]; then
    # Decrypt the secrets file
    echo $super_secret_password | gpg --passphrase-fd 0 secrets.tar.gpg
    tar xvf secrets.tar

    # Deploy on AppEngine
    ./mvnw package appengine:stage -Pgae -DskipTests
    jar xf target/appengine-staging/open-learnr-1.0.0.jar
    rm -f target/appengine-staging/open-learnr-1.0.0.jar
    ./mvnw appengine:deploy
fi
