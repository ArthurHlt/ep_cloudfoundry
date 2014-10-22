exports.loadSettings = function(hook, context){
    var settings = context.settings;
    var cfenv = require("cfenv");
    var appEnv = cfenv.getAppEnv();

    var dbService = settings.dbService || "DATABASE";
    if (appEnv.getService(dbService) != null
        && appEnv.getService(dbService).credentials.uri != undefined
        && appEnv.getService(dbService).credentials.uri != null) {
        var parseDbUrl = require("parse-database-url");
        var dbConfig = parseDbUrl(appEnv.getService(dbService).credentials.uri);
        exports.dbType = dbConfig.driver;
        /**
         * This setting is passed with dbType to ueberDB to set up the database
         */
        exports.dbSettings = {
            "user": dbConfig.user,
            "password": dbConfig.password,
            "host": dbConfig.host,
            "port": dbConfig.port,
            "database": dbConfig.database
        }
    }
    var ldapService = settings.ldapService || "LDAP";
    if (appEnv.getService(ldapService) != null) {
        exports.users.ldapauth = appEnv.getService(ldapService).credentials;
    }
};
