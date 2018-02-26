import Vue from 'vue';
import Router from 'vue-router';
import Page from '../pages/page';
import Echarts from '../pages/echarts2';
import Login from "../pages/login";
import Home from "../pages/home";
import Msg from "../pages/msg"
import Layout from '../components/layout/layout';
import Temp from "../pages/template/main";
import AddEquipment from '../pages/equipmentmanagement/addequipment';
import OptionalModule from '../pages/template/main';
import EquipmentDetail from '../pages/equipment';
import AddChildEquipment from '../pages/device_tree';

Vue.use(Router);

const AAAA = {
  template: '<div>设备模板</div>'
};

const BBBB = {
  template: '<div>设备列表</div>'
};

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login,
        },
        {
            path: "",
            name: "home",
            component: Home,
            children: [
                { path: '/home', component: Page },
                {
                    path: "/page",
                    name: "page",
                    component: Page,
                    children: [{
                        path: '/echarts',
                        name: 'echarts',
                        component: Echarts
                    }, {
                        path: '/msg',
                        name: "msg",
                        component: Msg
                    }]
                }
            ]
        },
      {
        path: '/layout',
        name: 'layout',
        component: Layout,
        children: [
          {
            path: '/AddEquipment',
            name: 'AddEquipment',
            component: AddEquipment,
            children: [
              {
                path: '/AddEquipment/OptionalModule',
                name: 'OptionalModule',
                component: OptionalModule,
              },
              {
                path: '/AddEquipment/EquipmentDetail',
                name: 'EquipmentDetail',
                component: EquipmentDetail,
              },
              {
                path: '/AddEquipment/AddChildEquipment',
                name: 'AddChildEquipment',
                component: AddChildEquipment,
              },
            ]
          },
          {
            path: '/AAAA',
            name: 'AAAA',
            component: AAAA,
          },{
            path: '/BBBB',
            name: 'BBBB',
            component: BBBB,
          },
        ]
      },
      {
        path: "/temp",
        name: 'temp',
        component: Temp
      },
      {
        path: '/equipment',
        name: 'equipment',
        component: EquipmentDetail,
      }
    ],
});
