"use client";

import { ToastCard } from "@/components/ui/ToastCard";
import { showToast } from "@/lib/toast";

export default function DemoPage() {
  const saveSettings = (settings: unknown) =>
    new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div className='flex flex-col gap-3 p-6'>
      <button onClick={() => showToast.success("Successfully toasted!")}>
        Success
      </button>

      <button onClick={() => showToast.error("This didn't work.")}>
        Error
      </button>

      <button
        onClick={() =>
          showToast.promise(saveSettings({}), {
            loading: "Saving...",
            success: <b>Settings saved!</b>,
            error: <b>Could not save.</b>,
          })
        }
      >
        Promise
      </button>

      <button
        onClick={() =>
          showToast.big(
            "This toast is super big. I don't think anyone could eat it in one bite.\n\nIt's larger than you expected. You eat it but it does not seem to get smaller.",
            6000,
          )
        }
      >
        Big toast
      </button>

      <button onClick={() => showToast.withIcon("Good Job!", "👏")}>
        With icon
      </button>

      <button
        onClick={() =>
          showToast.styled(
            "Hello Darkness!",
            {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            "👏",
          )
        }
      >
        Dark styled
      </button>

      <button
        onClick={() =>
          showToast.interactive((t) => (
            <span>
              Custom and <b>bold</b>
              <button
                className='ml-2 text-indigo-600 underline'
                onClick={() => showToast.dismiss(t.id)}
              >
                Dismiss
              </button>
            </span>
          ))
        }
      >
        Interactive
      </button>

      <button
        onClick={() =>
          showToast.success("Look at my styles.", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: { primary: "#713200", secondary: "#FFFAEE" },
          })
        }
      >
        Success styled
      </button>

      <button
        onClick={() =>
          showToast.success("Always at the bottom.", {
            position: "bottom-center",
          })
        }
      >
        Bottom position
      </button>

      <button
        onClick={() =>
          showToast.custom((t) => (
            <ToastCard
              t={t}
              avatarUrl='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80'
              title='Emilia Gates'
              message='Sure! 8:30pm works great!'
            />
          ))
        }
      >
        Custom card toast
      </button>
    </div>
  );
}
