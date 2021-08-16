/**
*  该代码全为自动生成，为了不影响代码的持续生成，请不要修改此处代码
*  version:
*  date:  2021-08-16 11:22:11
*  mbg-author: Petty Fox
*/
import {PFApi} from '@/api/core/core'
const apiPrefix = '/api/sys'
/**
* function:
*  remove
* params:
	*[]

* body:
	*{
	*	"type":"object",
	*	"title":"BaseIdsParams",
	*	"properties":{
	*		"ids":{
	*			"type":"array",
	*			"items":{
	*				"type":"string"
	*			}
	*		}
	*	}
	*}

* response:
	*{
	*	"type":"object",
	*	"title":"RestObjectResponse«string»",
	*	"properties":{
	*		"msg":{
	*			"type":"string"
	*		},
	*		"code":{
	*			"format":"int32",
	*			"type":"integer"
	*		},
	*		"data":{
	*			"type":"string"
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
const remove = (body, params) => {
    return PFApi.apiRequest(
    {
        url: apiPrefix + '/delete',
        method: 'POST',
        data: body,
        params: params
    })
}
export const SysApi = {
    /**
     *
     */
    remove: remove
}
