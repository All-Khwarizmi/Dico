import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



const page = () => {

    const handleClick = () => {
        
    }
  return (
    <main>
        <div>
            <div>
                <button onClick={handleClick}></button>
            </div>
        </div>
    </main>
  )
};

export default page;
