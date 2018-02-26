export const toTreeData = (data) => {
  let pos = {};
  let tree = [];
  let i = 0;
  while (data.length !== 0) {
    if (data[i].parentid === 0) {
      tree.push({
        entitykey: data[i].entitykey,
        serial: data[i].serial,
        name: data[i].name,
        assertname: data[i].assertname,
        description: data[i].description,
        address: data[i].address,
        parentid: data[i].parentid,
        system: data[i].system,
        location: data[i].location,
        region: data[i].region,
        entitytype: data[i].entitytype,
        alarmupdate: data[i].alarmupdate,
        agentkey: data[i].agentkey,
        deleted: data[i].deleted,
        displayorder: data[i].displayorder,
        inhibit: data[i].inhibit,
        lastoperatorid: data[i].lastoperatorid,
        lastoperatortime: data[i].lastoperatortime,
        childcount: data[i].childcount,
        children: []
      });
      pos[data[i].entitykey] = [tree.length - 1];
      data.splice(i, 1);
      i--;
    } else {
      let posArr = pos[data[i].parentid];
      if (posArr !== undefined) {

        let obj = tree[posArr[0]];
        for (let j = 1; j < posArr.length; j++) {
          obj = obj.children[posArr[j]];
        }

        // if (data[i].entitytype === 12 && data[i].displayorder === 1) {
          obj.children.push({
            entitykey: data[i].entitykey,
            serial: data[i].serial,
            name: data[i].name,
            assertname: data[i].assertname,
            description: data[i].description,
            address: data[i].address,
            parentid: data[i].parentid,
            system: data[i].system,
            location: data[i].location,
            region: data[i].region,
            entitytype: data[i].entitytype,
            alarmupdate: data[i].alarmupdate,
            agentkey: data[i].agentkey,
            deleted: data[i].deleted,
            displayorder: data[i].displayorder,
            inhibit: data[i].inhibit,
            lastoperatorid: data[i].lastoperatorid,
            lastoperatortime: data[i].lastoperatortime,
            childcount: data[i].childcount,
            children: []
          });
        // }
        pos[data[i].entitykey] = posArr.concat([obj.children.length - 1]);
        data.splice(i, 1);
        i--;
      }
    }
    i++;
    if (i > data.length - 1) {
      i = 0;
    }
  }
  return tree;
};

export const pushData = (data, responseData) => {
  const newData = data.map(item => item);

  if (data && data.length !== 0  && responseData && responseData.length !== 0) {
    responseData && responseData.forEach(itemRes => {
      let isExist = false;
      data && data.forEach(item => {
        if (itemRes.entitykey === item.entitykey) {
          isExist = true;
        }
      });
      if (!isExist) {
        newData.push(itemRes);
      }
    });
  }
  return newData;
};
