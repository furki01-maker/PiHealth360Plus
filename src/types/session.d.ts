import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;  // Örnek: oturumda saklanacak kullanıcı ID'si
    // İstersen başka alanlar da ekleyebilirsin
  }
}
