import { baseUrl } from "./config";
import fetchData from './index';
import api from './api';
import Store from '../../vuex';

export const requestRootEntitys = params => {
    Store.commit('SHOW_DATA_TREE_LOADING');
    return fetchData.get(api.datatree.root, params)
        .then(res => {
            Store.commit('HIDE_DATA_TREE_LOADING');
            return res;
        })
        .catch(err => {
          Store.commit('HIDE_DATA_TREE_LOADING');
        });
};

export const requestChildEntitys = params => {
    Store.commit('SHOW_DATA_TREE_LOADING');
    return fetchData.get(`${api.datatree.childs}${params.entitykey}`, params)
        .then(res => {
            Store.commit('HIDE_DATA_TREE_LOADING');
            return res;
        })
        .catch(err => {
          Store.commit('HIDE_DATA_TREE_LOADING');
        });
};

export const requestDataNode = params => {
    return fetchData.get(`${api.datatree.datanode}${params.entitykey}`, params)
        .then(res => res)
        .catch(err => console.log(err));
};

export const requestDataPoint = params => {
    return fetchData.get(`${api.datatree.datapoint}${params.entitykey}`, params)
        .then(res => res)
        .catch(err => console.log(err));
};

export const requestDatapointstates = params => {
    return fetchData.get(`${api.datatree.datapointstates}${params.entitykey}`, params)
        .then(res => res)
        .catch(err => console.log(err));
};

// 像后台发送数据
export const sendDataPoint = params => {
    return fetchData.put(`${api.datatree.instruction}${params.key}/${params.entitykey}`, params)
        .then(res => res)
        .catch(err => console.log(err));
}

//请求后台实时数据
export const requestDataHistory = params => {
    return fetchData.get(`/admin/datapointstates/realtime/${params.entitykey}?currentId=${params.currentId}&MaxCount=${params.MaxCount}`, params)
        .then(res => res)
        .catch(err => console.log(err));
}

// 根据选择时间请求数据
export const requestDateMap = params => {
    return fetchData.get(`/admin/datapointstates/startAndEndTime/${params.entitykey}?startingTime=${params.startingTime}&endingTime=${params.endingTime}&page=${params.page}&rows=${params.rows}`, params)
        .then(res => res)
        .catch(err => console.log(err));

}

// 根据entitykey请求最早的数据的记录时间
export const requestBeginTime = params => {
    return fetchData.get(`/admin/datapointstates/oldtime/${params.entitykey}`, params)
        .then(res => res)
        .catch(err => console.log(err));
}
