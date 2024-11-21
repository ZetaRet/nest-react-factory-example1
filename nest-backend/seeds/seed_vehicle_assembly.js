const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const jsonpath = join(__dirname, './../seeddata/vehicle_assembly.json');
  const csvpath = join(__dirname, '/../seeddata/vehicle_assembly.csv');

  const json = JSON.parse(readFileSync(jsonpath));
  const csvfile = readFileSync(csvpath);
  const csv = csvfile.toString().split('\n');
  const csvdata = csv.map((e) => e.split(','));
  const csvcols = csvdata.shift();
  const csvobject = csvdata.map((e) => {
    let d = {};
    csvcols.forEach((c, i) => (d[c] = e[i]));
    return d;
  });

  console.log(json);
  console.log(csvcols, csvdata.length);
  //console.log(csvobject);

  const vendor = await knex.table('vendors').where('name', json.vendor).first();
  if (!vendor) {
    console.log('Vendor is not found, use seedvendors.');
    return;
  }
  console.log(vendor);

  const avids = await knex('assemble_vehicle').insert([
    {
      name: json.name,
      model: json.model,
      engine: json.engine,
    },
  ]);
  const avid = avids[0];
  const mparts = csvobject.map((e) => {
    let d = {};
    d.name = e.name;
    d.model = e.model;
    d.type = json.type;
    return d;
  });
  const mpartsids = await knex('mobile_parts').insert(mparts);
  const mpartfirstid = mpartsids[0];
  console.log('mpartsids:', mpartfirstid);
  csvobject.forEach((e, i) => (e.id = mpartfirstid + i));

  const vparts = csvobject.map((e) => {
    let d = {};
    d.vehicle_id = avid;
    d.parts_id = e.id;
    d.vendor_id = vendor.id;
    d.count = parseInt(e.count);
    return d;
  });
  const vpartsids = await knex('vehicle_parts').insert(vparts);
  console.log('vpartsids:', vpartsids[0]);

  const sparts = csvobject.map((e) => {
    let d = {};
    d.parts_id = e.id;
    d.vendor_id = vendor.id;
    d.count = parseInt(e.count);
    d.price = parseFloat(e.price);
    return d;
  });
  const storeids = await knex('store').insert(sparts);
  console.log('storeids:', storeids[0]);
};
