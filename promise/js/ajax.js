class ParamError extends Error{
    constructor(msg){
        super(msg)
        this.name = "paramError"
    }
}
class HttpError extends Error{
    constructor(msg){
        super(msg)
        this.name = "HttpError"
    }
}
function ajax(url){
    return new Promise((resolve,reject)=>{
        // box.style.dispaly = 'black'
        if(!/^http/.test(url)){
            throw new ParamError('请求地址错误')
        }
        let xhr = new XMLHttpRequest()
        xhr.open("GET",url)
        xhr.send()
        xhr.onload = function(){
            if(this.status == 200){
                resolve(JSON.parse(this.response))
            }else if(this.status == 404){
                reject(new HttpError('用户不存在'))
            }
            else{
                reject("加载失败")
            }
        }
        xhr.onerror = function(){
            reject(this)
        }
    })
}