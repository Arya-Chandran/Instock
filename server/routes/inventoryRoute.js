const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/* read and parse inventory data file */

const inventoryDataFile = path.join(__dirname, "../data/inventories.json");
const inventoryData = fs.readFileSync(inventoryDataFile);
const parseInventoryData = JSON.parse(inventoryData);

const getInventory = () => {
    return JSON.parse(fs.readFileSync("./data/inventories.json", "UTF-8"));
};

/* return an array of inventory objects */

router.get("/", (req, res) => {
    res.json(getInventory());
});

router.post("/add-item", (req, res) => {
    const newItem = {
        id: uuidv4(),
        warehouseID: req.body.warehouseID,
        warehouseName: req.body.warehouseName,
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity,
    };
    parseInventoryData.push(newItem);
    fs.writeFileSync(inventoryDataFile, JSON.stringify(parseInventoryData));
    res.status(201).json(newItem);
});

router.get("/:id", (req, res) => {
    const requestedID = req.params.id;
    const foundItem = parseInventoryData.find((item) => {
        if (item.id === requestedID) {
            return item.id;
        }
    });
    res.json(foundItem);
});

router.route("/:id/delete-item").delete((req, res) => {
    const inventoryId = req.params.id;
    const deleteInventoryId = parseInventoryData.findIndex((inventory) => {
        return inventory.id == inventoryId;
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

/* return an array of options for dropdown */

router.get("/dropdown/:property", (req, res) => {
    const { property } = req.params;

    const propertyOptions = parseInventoryData
        .map((inventory) => {
            if (property === "warehouses") {
                const { warehouseID, warehouseName } = inventory;
                return { warehouseID, warehouseName };
            }
            return inventory[property];
        })
        .filter(
            (item, index, array) =>
                array.findIndex((t) => {
                    if (property === "warehouses") {
                        return t.warehouseID === item.warehouseID;
                    }
                    return t === item;
                }) == index
        );

    res.json(propertyOptions);
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const inventoryData = parseInventoryData;
    const {
        itemName,
        description,
        category,
        status,
        quantity,
        warehouseName,
        warehouseID,
    } = req.body;

    if (
        !itemName ||
        !description ||
        !category ||
        !status ||
        !warehouseName ||
        !warehouseID
    ) {
        res.status(404).send("Error: Invalid Inventory data!");
    }

    const activeInventory = inventoryData.find(
        (inventory) => inventory.id === id
    );

    if (!activeInventory) {
        res.status(404).send(
            `Error: warehouse data with ${id} doesn't exist in database!`
        );
    }

    if (activeInventory) {
        activeInventory.itemName = itemName;
        activeInventory.description = description;
        activeInventory.category = category;
        activeInventory.status = status;
        activeInventory.warehouseName = warehouseName;
        activeInventory.warehouseID = warehouseID;
        activeInventory.quantity = quantity;
    }

    const updatedInventoryData = inventoryData.map((inventory) => {
        if (inventory.id === id) {
            inventory = activeInventory;
        }
        return inventory;
    });

    fs.writeFile(
        `./data/inventories.json`,
        JSON.stringify(updatedInventoryData),
        (error) => {
            if (error) {
                res.status(404).send("Error: data updation failed!");
                return;
            }
            res.status(200).send({
                message: "Inventory data updated successfully",
                updatedData: activeInventory,
            });
        }
    );
});

module.exports = router;
