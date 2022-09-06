module.exports = function (app) {
    // render the homepage
    app.get("/", function (req, res) {
        res.render("index.html")
    });

    // render the about page
    app.get("/about", function (req, res) {
        res.render("about.html")
    });

    // render the add device page
    app.get("/add-device", function (req, res) {
        res.render("add-device.html");
    });

    // route that displays a list of current devices with delete option
    app.get("/delete-device", function (req, res) {
        // query the database to get all current devices
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not get current devices' });
            }
            res.render("delete-device.html", { currentDevices: result });
        });
    });

    // route that displays a list of current devices with status option
    app.get("/device-status", function (req, res) {
        // query the database to get all current devices
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not get current devices' });
            }
            res.render("device-status.html", { currentDevices: result });
        });
    });

    // route for getting device status by ID
    app.get("/device-status/:id", function (req, res) {
        let deviceid = [req.params.id];
        let sqlquery = "SELECT * FROM devices WHERE id = ?";

        db.query(sqlquery, deviceid, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not find requested device' });
            }
            res.render("status-view.html", { currentDevices: result });
        });
    }); 

    // route for displaying a list of devices to update
    app.get("/update-device", function (req, res) {
        // query the database to get all current devices
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not get current devices' });
            }
            res.render("update-device.html", { currentDevices: result });
        });
    });

    // route for updating device by ID
    app.get("/update-device/:id", function (req, res) {
        let deviceid = [req.params.id];
        let sqlquery = "SELECT * FROM devices WHERE id = ?";

        db.query(sqlquery, deviceid, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not get requested device' });
            }
            res.render("update-view.html", { currentDevices: result });
        });
    }); 

    // post request that adds the device to the database
    // input data includes only valid fields, others initialised as null
    app.post("/device-added", function (req, res) {
        // set up the query string and key and value lists
        let sqlquery = "INSERT INTO devices (";
        let keys = [];
        let queryValues = [];

        // get the keys and values from the request body
        for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
                keys.push(key);
                queryValues.push(req.sanitize(req.body[key]));
            }
        }
        // build the values string
        let queryValuesString = "'" + queryValues.join("','") + "'";

        // add the keys and values to the sql query string
        sqlquery += keys.toString() + ") VALUES (" + queryValuesString + ")";

        // query the database
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not add device' });
            } else
                 res.render("success.html", { success: req.body.type + ' added succesfully' });
        });
       
    });

    // route for deleting devices
    // deletes based on ID query
    app.post("/delete-device", function (req, res) {
        // set up the query string and append id
        let sqlquery = 'DELETE FROM devices WHERE id = ' + req.body.id;

        // query the database
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not delete requested device' });
            } else
                 res.render("success.html", { success: 'Device deleted succesfully' });
        });
        
    });

    // route for updating devices
    // input of applicable fields only
    app.post("/update-device", function (req, res) {
        // set up the query string and arguments list
        let sqlquery = "UPDATE devices SET ";
        let queryStrings = [];

        // get the keys and values and create string
        for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
                let string = "";
                string += key + " = " + "'" + req.sanitize(req.body[key]) + "'";
                queryStrings.push(string);
            }
        }

        // add the arguments to the sql query string
        sqlquery += queryStrings.toString() + " WHERE id=" + req.body.id;

        // query the database
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render("failure.html", { failure: 'Could not update requested device' });
            } else
                 res.render("success.html", { success: 'Device updated succesfully' });
        });
       
    });    
}