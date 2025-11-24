import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rid = "EP_1762514248206_1";
  const crn = "CRN_1762514248206_1";
  const amt = 320;

  // Your backend endpoint (LoopBack / Next API / Axis)
  
  const redirectUrl = `http://15.206.249.5:3042/bapi/orders/easypay/initiate?rid=${rid}&crn=${crn}&amt=${amt}`;
  // const redirectUrl = `https://aavin-api.boom123.in/bapi/orders/easypay/initiate?rid=${rid}&crn=${crn}&amt=${amt}`;

  // Perform the redirect from the server
  res.writeHead(302, { Location: redirectUrl });
  res.end();

  // This line never runs because of the redirect
  return { props: {} };
};

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center text-center">
      <h1>Redirecting to EasyPay...</h1>
    </div>
  );
}
