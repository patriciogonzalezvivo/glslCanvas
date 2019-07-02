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
                    this.files[m[1]] = 'data';
                    this.loadFile(m[1]);
                }

                console.log(this.files);
            }
        } while (m);
    
        source = source.replace(exp,"");
        return source;
    }
    
    loadFile(src)
    {
        let p = new Promise(function(resolve, reject) {
            var element = document.createElement('script');
                element.async = true;   
                element.type = "text/javascript";

            var parent = 'body';
            var attr = 'src';
    
            // Important success and error for the promise
            element.onload = () => { console.log('loaded:',src); resolve(src) };
            element.onerror = () => reject(src);
            element[attr] = src;
            document[parent].appendChild(element);            
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