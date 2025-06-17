import { QueryClient } from "@tanstack/react-query";
import apiClient from "@/apis/apiClient";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

export async function mapListLoader() {
  // 캐시에 데이터가 없으면 fetch, 있으면 캐시 사용
  await queryClient.ensureQueryData({
    queryKey: ["mapList"],
    queryFn: async () => {
      const response = await apiClient.get(`/api/map-list?userId=${""}`);

      return response.data.data;
    },
  });

  return null; // 데이터는 useQuery에서 바로 사용
}
