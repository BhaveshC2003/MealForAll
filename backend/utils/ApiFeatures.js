class ApiFeatures{
    constructor(query,queryObject){
        this.query = query;
        this.queryObject = queryObject;
    }

    search(){
        const keyword = this.queryObject.keyword ? {
            name: {
                $regex: this.queryObject.keyword,
                $options: "i"
            }
        }: 
        {}

        this.query = this.query.find(keyword);

        return this;

    }

    filter(){
        const queryToBeRemoved = ["keyword","page","limit"];
        const queryObjCopy = {...this.queryObject} //Using spread operator to make Deep Copy of the query Object

        queryToBeRemoved.forEach((query)=>{
            delete queryObjCopy[query];
        });

        let queryObjString = JSON.stringify(queryObjCopy);
        queryObjString = queryObjString.replace(/\b(gte|gt|lt|lte)\b/g,(op)=>`$${op}`);
        this.query = this.query.find(JSON.parse(queryObjString));
        return this;
    }

    pagination(productsPerPage){
        const currentPage = this.queryObject.page;
        const skippedProducts = productsPerPage * (currentPage - 1);
        this.query = this.query.limit(productsPerPage).skip(skippedProducts);
        
        return this;
    }
}

module.exports = ApiFeatures;