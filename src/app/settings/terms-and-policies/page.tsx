"use client";

import { useEffect, useRef, useState } from "react";
import type Quill from "quill";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "@/redux/features/settings/settingsAPI";

const EditTermsAndConditions = () => {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const quillReadyRef = useRef(false);
  const [content, setContent] = useState<string>("");

  const { data } = useGetTermsAndConditionsQuery({});
  const [updateTermsAndConditions, { isLoading: isUpdating }] =
    useUpdateTermsAndConditionsMutation();

  const existing = data?.data[0];

  // Step 1: Init Quill once on mount
  useEffect(() => {
    if (quillReadyRef.current || typeof window === "undefined") return;

    const init = async () => {
      const { default: Quill } = await import("quill");
      await import("quill/dist/quill.snow.css");

      if (editorRef.current && !editorRef.current.querySelector(".ql-editor")) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter your terms and conditions...",
        });

        quillRef.current = quill;
        quillReadyRef.current = true;

        quill.on("text-change", () => {
          setContent(quill.root.innerHTML);
        });
      }
    };

    init();
  }, []);

  // Step 2: Once API data is ready AND Quill is ready, populate content
  useEffect(() => {
    if (!existing?.content) return;

    // Poll until quillRef is ready (handles async init timing)
    const interval = setInterval(() => {
      if (quillRef.current) {
        quillRef.current.root.innerHTML = existing.content;
        setContent(existing.content);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [existing?.content]);

  const handleSubmit = async () => {
    if (!existing) return;
    try {
      const res = await updateTermsAndConditions({
        title: existing.title,
        content,
      }).unwrap();

      if (!res.status) throw new Error(res.message);
      if (res?.status) {
        toast.success("Saved successfully!");
        router.push("/dashboard/admin/settings/terms-and-conditions");
      }
    } catch {
      toast.error("Save failed.");
    }
  };

  return (
    <div className='min-h-[7vh] max-w-full mx-auto flex flex-col justify-between gap-6'>
      <div className='space-y-6'>
        <div className='h-auto border4 rounded-2xl'>
          <div
            ref={editorRef}
            className='min-h-[35vh] bg-white text-base'
            id='quill-editor'
          />
        </div>
      </div>

      <div className='w-full'>
        <div className='pt-2'>
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className='min-w-full block px-4 py-3 bg-[#d08726] hover:bg-[#b8751d] text-white font-medium rounded-xl transition-colors disabled:opacity-70'
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTermsAndConditions;
