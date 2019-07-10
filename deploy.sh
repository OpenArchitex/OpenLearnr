# Semvar versioning regex (https://github.com/semver/semver/issues/232#issuecomment-405596809)
SEMVAR="^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$"

if [[ $TRAVIS_TAG =~ $SEMVAR ]]; then
    # Decrypt the secrets file
    echo $super_secret_password | gpg --passphrase-fd 0 secrets.tar.gpg
    tar xvf secrets.tar

    # Deploy on AppEngine
    ./mvnw package appengine:deploy -Pprod,war -DskipTests
fi
