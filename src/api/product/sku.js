import request from '@/utils/request'

export const reqSkuList = (page, limit) => request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
})

// 上架商品
export const reqOnSale = (skuId) => request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
})

// 下架商品
export const reqCancelSale = (skuId) => request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
})

// 查看详情
export const reqSkuById = (skuId) => request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
})
