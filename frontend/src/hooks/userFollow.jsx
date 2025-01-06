import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// เขียนเป็น hooks เพราะจะใช้หลายที่คือ ที่ right panel กับหน้า profile

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate:follow, isPending } = useMutation({
    mutationFn: async(userId) => {
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          method: "POST"
        });
        const data = await res.json();
  
        if(!res.ok) throw new Error(res.error || "Something went wrong");
  
        return
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      Promise.all([// Promise.all คือ ทำให้ทั้งสองโค้ดนี้ทำงานพร้อมกัน
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),// รี right panel
        queryClient.invalidateQueries({ queryKey: ["authUser"] })// update user follow รีหน้า profile
      ])
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { follow, isPending };
}

export default useFollow;