import { S_IFREG } from "constants";

export default class Includes {
    constructor()
    {
        this.files = {};
    }

    stripIncludes( source )
    {
        let exp = /#include\s([\w].*)/ig;
        let file = source.match(/(?=#include).*/ig);
    
        var m;
        do {
            m = exp.exec(source);
            if (m) {
                if(this.isFileNew(m[1]) == false)
                {
                    let src = m[1];
                    this.files[src] = '';
                    this.loadFile(src).then( (data) => this.includeFile(src,data)  ).catch((res) => console.log('include error:',src,' ',res));
                }

                // console.log(this.files);
            }
        } while (m);
    
        source = source.replace(exp,"");
        return source;
    }
    
    include(data){}     // going to over-ride this

    includeFile(src,data)
    {
        // console.log('put include file in our shader.',src,data);
        this.files[src] = data;
        this.include(data);
        // console.log(this.files);
    }

    loadFile(src)
    {
        return new Promise( (resolve,reject) => {
            var client = new XMLHttpRequest();
            client.open('GET', src, true);
            client.overrideMimeType("text/plain");
            client.setRequestHeader("Content-type","text/html; charset=utf-8");
            client.onreadystatechange = () => {
    
                if (client.readyState == 4)
                {
                    if(client.status == 200 || client.responseText != '')        // || client.status == 0
                        resolve( client.responseText );
                    else
                        reject( client.type );
                }
            }
            client.onerror = (ex) => reject(ex);
            client.send();
        });
    }

    isFileNew(src)
    {
        const keys = Object.keys(this.files)
        for (const key of keys) {
            if(key === src)
                return true;
        }
        return false;
    }
}