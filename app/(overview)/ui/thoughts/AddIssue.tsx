"use client";

import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  description: string;
  mood: string;
};

const AddIssue = () => {
  const { modalId, openModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <button onClick={openModal} className="btn btn-sm">
        ثبت مسله
      </button>
      <Modal id={modalId}>
        <form onSubmit={handleSubmit(onSubmit)} dir="rtl">
          <label className="form-control w-full ">
            <div className="label pb-1">
              <span className="label-text-alt font-bold text-sm ">
                متن مسله
              </span>
            </div>
            <textarea
              {...register("description", { required: true })}
              placeholder="چطور ثروتمند شوم؟"
              className="textarea textarea-bordered w-full focus-visible:outline-none"
            />
            {errors.description && (
              <span className="label-text text-error mb-1">
                لطفا متن مسله را وارد کنید
              </span>
            )}
          </label>
          <div className="max-w-44">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-bold text-sm">
                  همراه باه حس مثبت
                </span>
                <input
                  {...register("mood")}
                  type="radio"
                  defaultChecked
                  value={"good"}
                  className="radio radio-sm checked:bg-primary"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer pt-0">
                <span className="label-text font-bold text-sm">
                  همراه با حس منفی
                </span>

                <input
                  {...register("mood")}
                  type="radio"
                  value={"bad"}
                  className="radio radio-sm checked:bg-error"
                />
              </label>
            </div>
          </div>
          <button type="submit" className="btn w-full btn-sm mt-3 btn-primary ">
            ثبت
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddIssue;
