import React, { useState } from "react";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/from/Label";
import InputField from "../../components/from/input/InputField";
import Select from "../../components/from/Select";
import Switch from "../../components/from/switch/Switch";
import UploadComponent from "../../components/from/UploadComponent";
import Button from "../../components/ui/Button/Button";
import { PlusIcon } from "../../icon";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../Category/hooks/useCategories";
// import type { CreateProductRq } from "../../types/product/productType";
import { uploadFile } from "../../services/uploadfile";
import { productServices } from "../../services/ProductServices";
// import { productServices } from "../../services/productService";
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

 const Product = () => {
  const { categories } = useCategories();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState({
    name: "",
    categoryId: 0,
    description: "",
    price: 0,
    quantity: "",
    isBestseller: 1,
    isNewArrival: 1,
    discount: 0,
    images: [],
    star: 5,
  });
  const [images, setImages] = useState<string[]>([]);

  const [isShowDiscount, setIsShowDiscount] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const handleSelectChange = (value: string) => {
    console.log(value, "xxxxxxxxxxx");
    setProduct({ ...product, categoryId: +value });
  };
  const handleSwitchChangeBestseller = (checked: boolean) => {
    setProduct({ ...product, isBestseller: +checked });
  };
  const handleSwitchChangeNewArrival = (checked: boolean) => {
    setProduct({ ...product, isNewArrival: +checked });
  };

  const handleSwitchChangeDiscount = (checked: boolean) => {
    setIsShowDiscount(checked);
  };

  const handleChangeUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadFile(formData);
        if (result.status === 201) {
          const imageUrl = `${baseURL}/${result.data.data.path}`;
          uploadedUrls.push(imageUrl);
        }
      }

      console.log("✅ Upload thành công:", uploadedUrls);
      setImages(uploadedUrls);
    } catch (error) {
      console.error("❌ Upload thất bại:", error);
    }
  };
  const handleChangeFormProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("xxxxxxxxxx", product);
    const res = await productServices.createProduct({
      ...product,
      discount: +product.discount,
      description,
      images,
    });
    if (res.status === 201) {
      setImages([]);
      setProduct({
        name: "",
        categoryId: 0,
        description: "",
        price: 0,
        quantity: "",
        isBestseller: 1,
        isNewArrival: 1,
        discount: 0,
        images: [],
        star: 5,
      });
      setImages([]);
      setDescription("");
      navigate("/list-product");
    }
  };
  return (
    <>
      <PageBreadCrumb pageTitle="Thêm sản phẩm" />
      <div className="flex justify-end mb-6">
        <Button
          size="sm"
          endIcon={<PlusIcon />}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="Thông tin cơ bản">
            <div>
              <Label htmlFor="1">Tên sản phẩm</Label>
              <InputField
                id="1"
                type="text"
                placeholder="Nhập tên sản phẩm"
                name="name"
                onChange={handleChangeFormProduct}
              />
            </div>
            <div>
              <Label htmlFor="description">Mô Tả</Label>
              <textarea
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả sản phẩm"
                name="description"
                className="border w-full mt-4 rounded-xl p-3 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="2">Danh mục</Label>
              <Select
                options={categories.map((i) => {
                  return {
                    label: i.name,
                    value: i.id,
                  };
                })}
                onChange={(value) => handleSelectChange(value)}
                placeholder="Chọn danh mục"
              />
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <Label htmlFor="3">Giá</Label>
                <InputField
                  type="number"
                  id="3"
                  placeholder="Nhập giá sản phẩm"
                  name="price"
                  onChange={handleChangeFormProduct}
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="4">Số lượng</Label>
                <InputField
                  type="number"
                  id="4"
                  placeholder="Nhập số lượng sản phẩm"
                  name="quantity"
                  onChange={handleChangeFormProduct}
                />
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="Cài đặt sản phẩm">
            <div className="flex gap-20 justify-between">
              <Switch
                label="Discount"
                defaultChecked={isShowDiscount}
                onChange={handleSwitchChangeDiscount}
              />
              <Switch
                label="Hàng giảm giá"
                defaultChecked={true}
                onChange={handleSwitchChangeBestseller}
              />
              <Switch
                label="Hàng Hot"
                defaultChecked={true}
                onChange={handleSwitchChangeNewArrival}
              />

              {/* <Switch label="Disabled" disabled={true} /> */}
            </div>{" "}
            <div>
              {isShowDiscount && (
                <div className="w-1/2">
                  <Label htmlFor="5">Giảm giá</Label>
                  <InputField
                    type="number"
                    id="5"
                    placeholder="Nhập % giảm giá"
                    name="discount"
                    onChange={handleChangeFormProduct}
                  />
                </div>
              )}
            </div>
          </ComponentCard>
        </div>
        <div className="space-y-6">
          <ComponentCard title="Thêm ảnh sản phẩm">
            <UploadComponent
              title="Thêm ảnh sản phẩm"
              multiple={true}
              onChangeFile={(files) => handleChangeUpload(files)}
            />
            <div className="pt-2 flex gap-2.5">
              {images.length > 0 &&
                images.map((img, idx) => (
                  <img
                    className="object-cover"
                    key={idx}
                    src={img}
                    alt={`Ảnh ${idx}`}
                    width={100}
                    height={100}
                  />
                ))}
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
};

export default Product