var status = rs.status();
if (status.errmsg === 'no replset config has been received') {
    rs.initiate();
}
for (var i = 1; i <= param; i++) {
    if (i!==1)
        rs.add(folder+"_openlearnr-mongodb-node_" + i + ":27017");
}
var cfg = rs.conf();
cfg.members[0].host = folder+"_openlearnr-mongodb-node_1:27017";
rs.reconfig(cfg);
