import { S_IFREG } from "constants";

export default class Includes {
    constructor()
    {
        this.files = {};
        this.file = '';
    }

    stripIncludes( source )
    {
        // define our file to strip here
        this.file = source;

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
                    this.loadIncludeFile(src).then( (data) => this.includeFileLoaded(src,data)  ).catch((res) => console.log('include error:',src,' ',res));
                }

                // console.log(this.files);
            }
        } while (m);
    
        source = source.replace(exp,"");

        this.file = source;
        return source;
    }
    
    fileIncluded(file){}     // going to over-ride this

    injectIncludeFile(src,includeSrc)
    {
        let  def = /\#ifdef(\s\S*)+\#endif/img;
        let header = src.match(def);
        src = src.replace(def,header+'\n\n'+includeSrc);
        return src;
    }

    includeFileLoaded(src,include)
    {
        // console.log('put include file in our shader.',src,data);
        this.files[src] = include;
        console.log(include);
        this.file = this.injectIncludeFile(this.file,include);
        this.fileIncluded(this.file);
        // console.log(this.files);
    }

    loadIncludeFile(src)
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