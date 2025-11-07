const express = require('express')
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const app = express();

app.use(express.json());

app.get('/',async(req,res)=>{
    const data = await prisma.product.findMany();
    console.log(data);
    res.send(data);

})

app.get('/:id',async(req,res)=>{
    const id=req.params.id;

    const data = await prisma.product.findUnique({where:{product_id:id}});

    if(!data) {
        return res.status(404).json({message:`Product ${id} not Found`});

    }

    res.json(data);
})

app.post('/products',async(req,res)=>{
    try{
        const data = req.body;

        const add = await prisma.product.create({
            data:{
                product_image_url: data.product_image_url,
                product_price : data.product_price,
                product_title: data.product_title,
                product_rating: data.product_rating,
                product_category_group:data.product_category_group,
                product_location:data.product_location
            }
        })
        console.log(add)

        res.status(200).json(add);


    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Error"});
    }
   
    

})

app.put('/products/update',async(req,res)=>{
    try{
        const data = req.body;

    const check = await prisma.product.findUnique({where:{product_id:data.product_id}});

    if(!check){
        return res.status(404).json({message:"Data Not Found"});

    }
    const upd= await prisma.product.update({where:{product_id:data.product_id},
        data:{
                product_image_url: data.product_image_url,
                product_price : data.product_price,
                product_title: data.product_title,
                product_rating: data.product_rating,
                product_category_group:data.product_category_group,
                product_location:data.product_location
        }
    })

    
    res.status(200).json(upd);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
    }
    
})

app.patch('/products/specific/update/:id',async(req,res)=>{
    try{
        const id =  req.params.id;
        const data = req.body;

        const check = await prisma.product.findUnique({where:{product_id:id}});

        if(!check){
            return res.json(404).json({message:"Data Not found"});
        }

        const update = await prisma.product.update({where:{product_id:id},
            data
    })

        res.status(200).json(update);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
    }
   
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;

        const get = await prisma.product.findUnique({where:{product_id:id}});

        if(!get) return res.status(404).json({message:"Data is missing"});

        const del= await prisma.product.delete({where:{product_id:id}});

        res.json({message:"Deleted successfully"}); 
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"})
    }
    
})

app.listen(3000,()=>{
    console.log("Server is running");
})