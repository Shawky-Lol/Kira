import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    toast({
      title: "Message Sent",
      description: "Our concierge team will respond within 24 hours.",
    });
    
    form.reset();
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-32 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <div className="flex flex-col">
            <h1 className="font-serif text-5xl md:text-6xl mb-8">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-16 max-w-md font-light leading-relaxed">
              Whether you need styling advice, have questions about a piece, or wish to schedule a private fitting.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Concierge Services</h3>
                <p className="text-muted-foreground mb-2">concierge@kirastore.com</p>
                <p className="text-muted-foreground">+1 (800) 555-KIRA</p>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Mon-Fri, 9am-6pm EST</p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Press & Media</h3>
                <p className="text-muted-foreground">press@kirastore.com</p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Flagship Atelier</h3>
                <p className="text-muted-foreground mb-1">104 Grand Street</p>
                <p className="text-muted-foreground mb-1">New York, NY 10013</p>
                <p className="text-xs text-primary mt-2 uppercase tracking-wider">By Appointment Only</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-card p-8 md:p-12 border border-border">
            <h2 className="font-serif text-3xl mb-8">Send a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} className="bg-transparent border-border focus:border-primary rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} className="bg-transparent border-border focus:border-primary rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this regarding?" {...field} className="bg-transparent border-border focus:border-primary rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[150px] bg-transparent border-border focus:border-primary rounded-none resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 mt-4"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
