import { S_IFREG } from "constants";

export default class Includes {
    constructor()
    {
        this.files = {};
        this.file = '';
    }

    cancelPromiseCallbacks()
    {        
        let c = Object.keys(this.files).length;

        if(c <= 0)
            return;

        const values = Object.values(this.files)
        for (const value of values) {
            value.parse = false;
        }

        this.files = {};
    }

    stripIncludes( source )
    {
        // cancel any current promises
        this.cancelPromiseCallbacks();

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
                    let f = src;
                    let p = this.loadIncludeFile(src).then( (data) => this.includeFileLoaded(src,data)  ).catch((res) => console.log('include error:',src,' ',res));
                    let o = {
                        'src':f,
                        'promise':p,
                        'include:':'',
                        'parse':true
                    };
                    this.files[src] = o;
                }
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
        let f = this.files[src];
        this.files[src].include = include;
        // console.log(include);
        this.file = this.injectIncludeFile(this.file,include);

        if(f.parse == false)
            return;

        this.fileIncluded(this.file);
        this.files[src].parse = false;
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


    // need to recreate this based on new structure
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