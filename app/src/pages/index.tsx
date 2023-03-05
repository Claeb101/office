import type { NextPage } from "next";
import { Layout } from "@/components/layout";
import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Header, { notify, ToastType } from "@/components/header";
import { Footer } from "@/components/footer";
import Background from "@/components/Background";
import React from "react";
import { handleInputChange } from "@/lib/handleInputChange";
import { InputField } from "@/components/InputField";
import OutlineButton from "@/components/OutlineButton";
import { useToasts } from "@/components/ToastProvider";
import { useSession } from 'next-auth/react'

const Home: NextPage<any> = ({ officers }) => {
  const { toastDispatch } = useToasts();
  const [input, setInput] = useState({
    phone: '',
  })
  const { data: session } = useSession()
  const submit = async () => {
    const operator = await fetch(process.env.NEXT_PUBLIC_API_URL + '/operator/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session['token'].sub}`
      },
      body: JSON.stringify({
        phone: input.phone
      })
    })

    notify(toastDispatch, "", "Updated Phone: " + input.phone, ToastType.SUCCESS)
  }

  return (
    <Layout>
      <div className="py-16 sm:py-24">
        <div className='w-full mt-4 flex justify-start flex-wrap'>
          <h1 className="text-white text-4xl font-bold">Vitality</h1>
          {
            session ?
              <div>
                <div className='w-72 mr-4'>
                  <InputField name="Phone Number" id="phone" value={input.phone} onChange={(e) => handleInputChange(e, input, setInput)} className="w-96" />
                </div>
                <div className='mt-4 flex items-center justify-center'>
                  <OutlineButton name="Register" onClick={submit} />
                </div>
              </div>
              : null
          }

        </div>
      </div>

    </Layout>
  );
};


export default Home;