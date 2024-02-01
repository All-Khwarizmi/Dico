import { NextRequest, NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Need to handle OPTIONS request here, unless you want to not use middleware
  // In which case you can define the OPTIONS method and set the CORS headers within route.ts
  // But using middleware is nice to avoid boilerplate of setting CORS on each route
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders });
  }

  // Then here set the CORS headers that will be returned with the regular response
  response.headers.append(
    "Access-Control-Allow-Origin",
    corsHeaders["Access-Control-Allow-Origin"]
  );
  response.headers.append(
    "Access-Control-Allow-Methods",
    corsHeaders["Access-Control-Allow-Methods"]
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    corsHeaders["Access-Control-Allow-Headers"]
  );

  // Continue to eventually call the matching route.ts method
  return response;
}
