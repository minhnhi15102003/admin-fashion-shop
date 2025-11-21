import { useState } from "react"
import PageBreadCrumb from "../../components/common/PageBreadCrumb"
import Button from "../../components/ui/Button/Button"
import { PlusIcon } from "../../icon"
import Modal from "../../components/ui/modal/Modal"
import Label from "../../components/from/Label"
import InputField from "../../components/from/input/InputField"
import UploadComponent from "../../components/from/UploadComponent"
import { uploadFile } from "../../services/uploadfile"
import { categoryServices } from "../../services/CategoryServices"
import { toast } from "react-toastify"
import ComponentCard from "../../components/common/ComponentCard"
import Table from "../../components/common/Table"
import { useCategories } from "./hooks/useCategories"
import type { CategoryRes } from "../../types/category/CategoryRes"
import dayjs from 'dayjs';
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const ListCategory = () => {
    const { categories, refetchListCategory } = useCategories()
    const [isOpenDialogCategory, setIsOpenDialogCategory] = useState(false)
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("")
    const handleChangeUpload = async (files: File[]) => {
        console.log(files, "files");
        const file = files[0]
        if (!file) {
            return
        }
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await uploadFile(formData)
            if (res.status === 201) {
                console.log(res);
                setImage(`${baseURL}/${res.data.data.path}`)
            }
        } catch (error) {

        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(category);
        const res = await categoryServices.createCategory({
            image,
            name: category
        })
        if (res.status === 201) {
            setIsOpenDialogCategory(false)
            setCategory("")
            setImage("")
            toast.success("Thêm danh mục thành công", {
                position: "top-right",
                autoClose: 500,
            })
            refetchListCategory();

        }
        console.log(res);

    }

    const handleRemoveCategory = async (id: number) => {
        const res = await categoryServices.removeCategory(id);
        console.log(res, "res");
        if (res.status === 200) {
            toast.success("Xóa thành công", {
                position: "bottom-center",
                autoClose: 500,
            });
            refetchListCategory();
        }
    }
        return (
            <div>
                <PageBreadCrumb pageTitle="Danh sách danh mục" />
                <div className="flex justify-end pb-2 font-semibold ">
                    <Button
                        size="sm"
                        endIcon={<PlusIcon />}
                        onClick={() => setIsOpenDialogCategory(true)}>
                        Thêm danh mục
                    </Button>
                </div>

                <ComponentCard title="Danh sách danh mục">
                    <Table
                        dataThead={["Tên danh mục", "Hình ảnh", "Thời gian tạo", "Hành Động"]}
                    >
                        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {!!categories.length &&
                                categories.map((item: CategoryRes) => (
                                    <tr>
                                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <img src={item.image} width={100} height={100} />
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleRemoveCategory(item.id)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </ComponentCard>

                <Modal
                    isOpen={isOpenDialogCategory}
                    onClose={() => setIsOpenDialogCategory(false)}
                    className="max-w-[700px] m-4"
                >
                    <div className="relative w-full bg-white rounded-3xl flex flex-col max-h-[95vh]">
                        {/* Header */}
                        <div className="p-4">
                            <h4 className="text-2xl font-semibold text-gray-800">Thêm danh mục</h4>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
                            <form className="flex flex-col space-y-4">
                                <div>
                                    <Label>Tên danh mục</Label>
                                    <InputField
                                        type="text"
                                        value={category}
                                        placeholder="Thêm danh mục"
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <UploadComponent
                                        title="Thêm ảnh sản phẩm"
                                        multiple={false}
                                        onChangeFile={(files) => handleChangeUpload(files)}
                                    />
                                </div>

                                {image && (
                                    <div className="pt-3 relative ">
                                        <img src={image} width={300} height={300} className="rounded-2xl" />

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setImage("")}
                                            className="absolute top-6 left-65 bg-white/80 hover:bg-white
                                                    border rounded-full !p-1 shadow-md transition"
                                        >
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </Button>

                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-4 flex justify-end gap-3">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setIsOpenDialogCategory(false)}
                            >
                                Close
                            </Button>
                            <Button
                                size="sm"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    export default ListCategory