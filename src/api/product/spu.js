import request from '@/utils/request'

// 获取spu列表的接口
// /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {category3Id},
})

// 获取SPU信息
export const reqSpu = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
})

// 获取品牌信息
export const reqTradeMarkList = () => request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
})

// 获取SPU图片
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
})

// 获取平台全部销售属性  总共三个
export const reqBaseSaleAttrList = () => request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
})

// 修改SPU或者添加SPU 区别在于是否有id
export const reqAddOrUpdateSpu = (spuInfo) => {
    if(spuInfo.id) {
        return request({
            url: '/admin/product/updateSpuInfo',
            method: 'post',
            data: spuInfo
        })
    }
    else {
        return request({
            url: '/admin/product/saveSpuInfo',
            method: 'post',
            data: spuInfo
        })
    }
}

// 删除spu
export const reqDeleteSpu = (spuId) => request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
})

// 获取销售属性的数据
export const reqSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
})

// 获取平台属性信息
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
})

// 添加SKU
export const reqAddSku = (skuInfo) => request({
    url: '/admin/product/saveSkuInfo',
    method: 'post'
})

// 获取SKU列表
export const reqSkuList = (spuId) => request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
})