import Table from "../../components/common/Table";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/Button/Button";
import { PlusIcon } from "../../icon";
import { useNavigate } from "react-router-dom";
import { productServices } from "../../services/ProductServices";
import { useEffect, useState } from "react";
import type { Product } from "../../types/product/productType";
import { toast } from "react-toastify";

export const ListProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([])
  const [filterProduct, setFilterProduct] = useState({
    offset: 0,
    limit: 90,
    // search: "",
    // isNewArrival: 1,
    // isBestseller: 1,
    // categoryId: 0,
    // sort: "DATE_ASC",
  })
  const fetchDataProduct = async () => {
    const res = await productServices.getListProducts(filterProduct)
    console.log(res);
    if (res.status === 200) {
      setProducts(res.data.products)
    }
  }

  useEffect(() => {
    fetchDataProduct()
  }, [])

  const handleRemoveProduct = async (id: number) => {
    const res = await productServices.removeProducts(id);
    console.log(res, "res");
    if (res.status === 200) {
      toast.success("Xóa thành công", {
        position: "bottom-center",
        autoClose: 500,
      });
      fetchDataProduct();
    }
  }

  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Danh sách sản phẩm" />
      <div className="flex justify-end ">
        <Button onClick={() => navigate("/product")} size="sm" endIcon={<PlusIcon />}>
          Thêm sản phẩm
        </Button>
      </div>
      <ComponentCard title="Danh sách sản phẩm">
        <Table dataThead={["Tên sản phẩm", "Hình ảnh", "Danh mục", "Giá", "Hành động"]}>
          <tbody className="divide-y divide-gray-100 ">
            {products.length > 0 &&
              products.map((i) =>
                <tr>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    {i.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm ">

                  </td>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    {i.category?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    {i.price}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveProduct(i.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              )}

          </tbody>
        </Table>
      </ComponentCard>
    </div>
  );
};
