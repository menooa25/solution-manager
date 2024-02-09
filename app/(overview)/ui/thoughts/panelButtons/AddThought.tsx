"use client";

import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createThought } from "../../../lib/actions";
import { direction } from "direction";

type Inputs = {
  description: string;
  mood: string;
};
interface Props {
  type: "issue" | "solution";
}

const AddThought = ({ type }: Props) => {
  const { modalId, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await createThought(
      type === "issue",
      data.description,
      data.mood === "good"
    );
    setLoading(false);
    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className="btn btn-sm">
        ثبت {type === "issue" ? "مسله" : "راه حل"}
      </button>
      <Modal id={modalId}>
        <form onSubmit={handleSubmit(onSubmit)} dir="rtl">
          <label className="form-control w-full ">
            <div className="label pb-1">
              <span className="label-text-alt font-bold text-sm ">
                متن {type === "issue" ? "مسله" : "راه حل"}
              </span>
            </div>
            <textarea
              {...register("description", { required: true })}
              dir={direction(watch("description"))}
              placeholder={
                type === "issue" ? "چطور ثروتمند شوم؟" : "تفکر و عمل درست"
              }
              className="textarea textarea-bordered w-full focus-visible:outline-none"
            />
            {errors.description && (
              <span className="label-text text-error mb-1">
                لطفا متن {type === "issue" ? "مسله" : "راه حل"} را وارد کنید
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
          <button
            disabled={loading}
            type="submit"
            className="btn w-full btn-sm mt-3 btn-primary "
          >
            ثبت
            {loading && <span className="loading loading-sm loading-spinner" />}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddThought;
