module.exports = class Product {
    constructor(){
    this.id = 1,
    this.name = "Sushi at Home: a Mat-To-Table Sushi Cookbook",
    this.listPrice = 17.99,
    this.description = "Eating Sushi is Easy. Making Sushi is Even Easier.Let your love of sushi inspire you to prepare and enjoy it in your home. This beautiful guide and cookbook opens a window to everything that's so fascinating--and intimidating--about sushi, while laying out easy-to-follow tips and techniques to help sushi lovers become confident sushi chefs.",
    this.product_dimension = "8 X 0.6 X 8 inches",
    this.imageURLs = ["https://images-na.ssl-images-amazon.com/images/I/611AZDSUHvL._SY496_BO1,204,203,200_.jpg","https://images-na.ssl-images-amazon.com/images/I/81ECOQVXVGL.jpg"],
    this.weight = "13.9 oz",
    this.sourceURL = "https://www.amazon.com/gp/product/1623155975/ref=s9_acsd_simh_bw_c_x_1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-3&pf_rd_r=5S54Z6125KJDKW8DEBTV&pf_rd_r=5S54Z6125KJDKW8DEBTV&pf_rd_t=101&pf_rd_p=fe185ec9-c8f5-44c0-897e-4c0bde93268c&pf_rd_p=fe185ec9-c8f5-44c0-897e-4c0bde93268c&pf_rd_i=283155"
    }
    set_id(toSet){
        this.id = toSet;
    }
    set_name(toSet){
        this.name = toSet;
    }
    set_listPrice(toSet){
        this.listPrice = toSet;
    }
    set_description(toSet){
        this.description = toSet;
    }
    set_product_dimension(toSet){
        this.product_dimension = toSet;
    }
    set_imageURLs(toSet){
        this.imageURLs = toSet;
    }
    set_weight(toSet){
        this.weight = toSet;
    }
    set_sourceURL(toSet){
        this.sourceURL = toSet;
    }
    set_all(toSet){
        //id, name, listprice, description1, description2, product dimension, imageurls, weight, sourceurl
        this.id = toSet[0];
        this.name = toSet[1];
        this.listPrice = toSet[2];
        this.product_dimension = toSet[3];
        this.imageURLs = toSet[4];
        this.weight = toSet[5];
        this.sourceURL = toSet[6];
        this.description = "No description found. Tough luck.";
    }
  }
