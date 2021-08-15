/**
*  该代码全为自动生成，为了不影响代码的持续生成，请不要修改此处代码
*  version:
*  date:  2021-08-15 16:43:18
*  mbg-author: Petty Fox
*/
import {PFApi} from '@/api/core/core'
const apiPrefix = '/api/sys'
/**
* function:
*  getPermissionTree
* params:
	*[]

* body:

* response:
	*{
	*	"type":"object",
	*	"title":"RestObjectResponse«List«PermissionTreeData»»",
	*	"properties":{
	*		"msg":{
	*			"type":"string"
	*		},
	*		"code":{
	*			"format":"int32",
	*			"type":"integer"
	*		},
	*		"data":{
	*			"type":"array",
	*			"items":{
	*				"ref":"#/definitions/PermissionTreeData"
	*			}
	*		},
	*		"errmsg":{
	*			"type":"string"
	*		},
	*		"bcode":{
	*			"format":"int32",
	*			"type":"integer"
	*		}
	*	}
	*}

*
*/
const getPermissionTree = (body, params) => {
    return PFApi.apiRequest(
    {
        url: apiPrefix + '/getPermissionTree',
        method: 'POST',
        data: body,
        params: params
    })
}
export const SysApi = {
    /**
     *
     */
    getPermissionTree: getPermissionTree
}
