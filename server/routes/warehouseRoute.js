const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/* read and parse warehouse and inventory data files */

const warehouseDataFile = path.join(__dirname, "../data/warehouses.json");
const warehouseData = fs.readFileSync(warehouseDataFile);
const parseWarehouseData = JSON.parse(warehouseData);

const inventoryDataFile = path.join(__dirname, "../data/inventories.json");
const inventoryData = fs.readFileSync(inventoryDataFile);
const parseInventoryData = JSON.parse(inventoryData);

const getWarehouses = () => {
    return JSON.parse(fs.readFileSync("./data/warehouses.json", "UTF-8"));
};

const getInventory = () => {
    return JSON.parse(fs.readFileSync("./data/inventories.json", "UTF-8"));
};

/* return an array of warehouse objects */

router.get("/", (req, res) => {
    res.json(getWarehouses());
});

/* add new warehouse */

router.post("/add-warehouse", (req, res) => {
    const newWarehouseData = getWarehouses();
    const newWarehouse = {
        id: uuidv4(),
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contact: {
            name: req.body.contact.name,
            position: req.body.contact.position,
            phone: req.body.contact.phone,
            email: req.body.contact.email,
        },
    };
    newWarehouseData.push(newWarehouse);
    fs.writeFileSync(warehouseDataFile, JSON.stringify(newWarehouseData));
    res.status(201).json(newWarehouse);
});

router.get("/:id", (req, res) => {
    const requestedID = req.params.id;
    const foundWarehouse = parseWarehouseData.find((warehouse) => {
        if (warehouse.id === requestedID) {
            return warehouse.id;
        }
    });

    const inventoryData = getInventory();
    const foundInventory = inventoryData.filter((inventory) => {
        if (inventory.warehouseID === requestedID) {
            return inventory.warehouseID;
        }
    });
    if (!foundInventory) {
        res.status(404).send("Inventory not found");
    }

    const warehouseResponse = { foundWarehouse, foundInventory };

    res.json(warehouseResponse);
});

router.route("/:warehouseid/:itemid/delete-item").delete((req, res) => {
    const warehouseID = req.params.warehouseid;
    const itemId = req.params.itemid;
    const deleteInventoryId = parseInventoryData.findIndex((inventory) => {
        return inventory.id == itemId;
    });
    parseInventoryData.splice(deleteInventoryId, 1);
    fs.writeFile(
        inventoryDataFile,
        JSON.stringify(parseInventoryData),
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
    res.json(parseInventoryData);
});

router.route("/:id/delete-warehouse").delete((req, res) => {
    const warehouseId = req.params.id;
    fs.readFile("./data/warehouses.json", "utf8", (err, data) => {
        if (err) {
            res.json({ message: "error getting data" });
            return;
        }
        const warehouseData = JSON.parse(data);
        const deleteWarehouseId = warehouseData.findIndex((warehouse) => {
            return warehouse.id === warehouseId;
        });
        warehouseData.splice(deleteWarehouseId, 1);
        fs.writeFile(
            "./data/warehouses.json",
            JSON.stringify(warehouseData),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
    fs.readFile("./data/inventories.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        const inventoryData = JSON.parse(data);
        const deleteWarehouseInventory = inventoryData.filter((warehouse) => {
            return warehouse.warehouseID === warehouseId;
        });
        deleteWarehouseInventory.forEach(function (element) {
            let index = inventoryData.indexOf(element);
            inventoryData.splice(index, 1);
        });
        fs.writeFile(
            "./data/inventories.json",
            JSON.stringify(inventoryData),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
    res.send("Delete successful!");
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const warehouseData = parseWarehouseData;
    const { id: warehouseId, name, address, city, country, contact } = req.body;

    if (!name || !address || !city || !country || !contact) {
        res.status(404).send("Error: Invalid warehouse data!");
    }

    const activeWarehouse = warehouseData.find(
        (warehouse) => warehouse.id === id
    );

    if (!activeWarehouse) {
        res.status(404).send(
            `Error: warehouse data with ${id} doesn't exist in database!`
        );
    }

    if (activeWarehouse) {
        activeWarehouse.id = warehouseId;
        activeWarehouse.name = name;
        activeWarehouse.address = address;
        activeWarehouse.city = city;
        activeWarehouse.country = country;
        activeWarehouse.contact.name = contact.name;
        activeWarehouse.contact.position = contact.position;
        activeWarehouse.contact.phone = contact.phone;
        activeWarehouse.contact.email = contact.email;
    }

    const updatedWarehouseData = warehouseData.map((warehouse) => {
        if (warehouse.id === id) {
            warehouse = activeWarehouse;
        }
        return warehouse;
    });

    fs.writeFile(
        `./data/warehouses.json`,
        JSON.stringify(updatedWarehouseData),
        (error) => {
            if (error) {
                res.status(404).send("Error: data updation failed!");
                return;
            }
            res.status(200).send({
                message: "Warehouse data updated successfully",
                updatedData: activeWarehouse,
            });
        }
    );
});

module.exports = router;
