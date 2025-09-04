import Layout from "@/contexts/shared/components/Layout";
import DashboardLayout from "@/contexts/dashboard/pages/DashboardLayout";

const DashboardPage = () => {

  return (
    <Layout pageTitle="Dashboard">
      <DashboardLayout>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nobis delectus nemo eaque itaque deserunt laborum mollitia quo minus dolorem natus incidunt totam sunt quod, voluptatibus ex qui dolore explicabo?</p>
      </DashboardLayout>
    </Layout>
  )
}

export default DashboardPage