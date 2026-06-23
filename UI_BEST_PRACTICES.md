# Sunday Vibes UI Best Practices

## Design Philosophy

Sunday Vibes combines weekend energy (warm amber) with creative professionalism. The aesthetic is **warm, approachable, yet premium**.

### Core Principles

1. **Good Vibes Only** — UI should feel welcoming, not corporate
2. **Transparency** — Clear hierarchy, obvious actions, no hidden states
3. **Creative** — Output should feel custom, not generic
4. **Professional** — Premium feel without being stuffy

---

## Color System

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#F59E0B` | CTAs, highlights, active states |
| `--secondary` | `#7C3AED` | Accents, badges, secondary actions |
| `--foreground` | `#1C1917` | Body text, headings |
| `--muted-foreground` | `#78716C` | Labels, captions, disabled text |
| `--background` | `#FFFFFF` | Page background |
| `--card` | `#FFFFFF` | Card surfaces |
| `--border` | `#E7E5E4` | Dividers, borders |

### Semantic Colors

- **Success**: Use `--primary` (amber) for positive states
- **Warning**: Use `--secondary` (violet) for caution states
- **Error**: Use `--destructive` (red) for errors/destructive actions
- **Info**: Use `--muted-foreground` for neutral information

### Dark Mode

Dark mode inverts the palette while maintaining the warm amber accent:
- Background: `#1C1917` (stone-900)
- Card: `#292524` (stone-800)
- Primary stays `#F59E0B` for brand consistency

---

## Typography

### Font Stack

Using **Nunito** (via `--font-sans`) for all UI text. This creates a friendly, rounded aesthetic that matches the "good vibes" philosophy.

### Scale

```
Display/Hero: text-5xl md:text-6xl font-black
H1: text-4xl md:text-5xl font-black
H2: text-3xl font-bold
H3: text-2xl font-bold
Body: text-base (16px)
Small: text-sm
Caption: text-xs
```

### Weight Usage

- **Black (900)**: Hero headlines, major CTAs
- **Bold (700)**: Section titles, card titles
- **Semibold (600)**: Buttons, nav items
- **Medium (500)**: Labels, captions
- **Regular (400)**: Body text, descriptions

---

## Spacing & Layout

### Spacing Scale

Use Tailwind's default scale. Key values:

```
xs: 0.5rem (2)
sm: 0.75rem (3)
md: 1rem (4)
lg: 1.5rem (6)
xl: 2rem (8)
2xl: 3rem (12)
```

### Container

```tsx
<div className="container mx-auto px-4 md:px-6">
  {/* Content */}
</div>
```

### Section Spacing

```tsx
<section className="py-16 md:py-24">
  {/* Section content */}
</section>
```

### Grid Patterns

**Card Grid** (responsive):
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

**Dashboard Stats**:
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {/* Stat cards */}
</div>
```

---

## Component Patterns

### Buttons

#### Primary CTA
```tsx
<Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
  Book Now
</Button>
```

#### Secondary Action
```tsx
<Button variant="outline" className="rounded-full border-2 border-border">
  Learn More
</Button>
```

#### Ghost/Text Button
```tsx
<Button variant="ghost" className="text-muted-foreground hover:text-foreground">
  Cancel
</Button>
```

#### Destructive
```tsx
<Button variant="destructive" className="rounded-full">
  Delete
</Button>
```

### Cards

#### Standard Card
```tsx
<Card className="border-border bg-card">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

#### Interactive Card (Clickable)
```tsx
<Link href="/path" className="block group">
  <Card className="border-border bg-card hover:shadow-lg transition-shadow">
    <CardContent>
      {/* Content */}
    </CardContent>
  </Card>
</Link>
```

#### Stat Card
```tsx
<Card className="border-border bg-card">
  <CardContent className="pt-6">
    <div className="text-3xl font-black text-foreground">12</div>
    <div className="text-sm text-muted-foreground">Total Bookings</div>
  </CardContent>
</Card>
```

### Forms

#### Input Field
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    className="border-border"
  />
</div>
```

#### Form Group
```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>
  <Button type="submit" className="w-full">Submit</Button>
</div>
```

---

## Dashboard Patterns

### Layout Structure

```tsx
<div className="flex min-h-screen bg-background">
  {/* Sidebar */}
  <aside className="w-64 border-r border-border bg-card">
    {/* Navigation */}
  </aside>

  {/* Main Content */}
  <main className="flex-1">
    <div className="container mx-auto px-6 py-8">
      {/* Page content */}
    </div>
  </main>
</div>
```

### Page Header

```tsx
<div className="mb-8">
  <h1 className="text-4xl font-black text-foreground">Dashboard</h1>
  <p className="text-muted-foreground mt-2">
    Welcome back, {user.name}
  </p>
</div>
```

### Stats Grid

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <Card>
    <CardContent className="pt-6">
      <div className="text-3xl font-black text-primary">12</div>
      <div className="text-sm text-muted-foreground">Total Bookings</div>
    </CardContent>
  </Card>
  <Card>
    <CardContent className="pt-6">
      <div className="text-3xl font-black text-secondary">3</div>
      <div className="text-sm text-muted-foreground">Active Projects</div>
    </CardContent>
  </Card>
  <Card>
    <CardContent className="pt-6">
      <div className="text-3xl font-black text-foreground">Rp 5.2M</div>
      <div className="text-sm text-muted-foreground">Total Spent</div>
    </CardContent>
  </Card>
  <Card>
    <CardContent className="pt-6">
      <div className="text-3xl font-black text-destructive">1</div>
      <div className="text-sm text-muted-foreground">Unpaid Invoice</div>
    </CardContent>
  </Card>
</div>
```

### Data Table

```tsx
<Card>
  <CardHeader>
    <CardTitle>Recent Bookings</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Service</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border hover:bg-muted/50 transition-colors">
            <td className="py-3 px-4 text-sm">2024-01-15</td>
            <td className="py-3 px-4 text-sm">Event Organizer</td>
            <td className="py-3 px-4">
              <Badge className="bg-primary/10 text-primary">Confirmed</Badge>
            </td>
            <td className="py-3 px-4 text-sm text-right">Rp 5,000,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>
```

### Status Badges

```tsx
// Booking Status
<Badge className="bg-muted text-muted-foreground">Pending</Badge>
<Badge className="bg-primary/10 text-primary">Confirmed</Badge>
<Badge className="bg-secondary/10 text-secondary">In Progress</Badge>
<Badge className="bg-primary/20 text-primary">Completed</Badge>
<Badge className="bg-destructive/10 text-destructive">Cancelled</Badge>

// Payment Status
<Badge className="bg-destructive/10 text-destructive">Unpaid</Badge>
<Badge className="bg-primary/10 text-primary">Paid</Badge>
```

---

## Responsive Design

### Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Approach

```tsx
// Mobile: single column
// Tablet: 2 columns
// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### Hide/Show by Breakpoint

```tsx
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>
```

---

## Animation & Transitions

### Hover Effects

```tsx
// Card hover
<Card className="hover:shadow-lg transition-shadow">

// Button hover
<Button className="hover:bg-primary/90 transition-colors">

// Scale on hover
<div className="hover:scale-105 transition-transform">
```

### Loading States

```tsx
// Skeleton loader
<Skeleton className="h-32 w-full rounded-lg" />

// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
```

---

## Accessibility

### Color Contrast

- Ensure text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Use `--foreground` on `--background` for body text
- Use `--primary-foreground` (white) on `--primary` (amber) for CTAs

### Focus States

```tsx
<Button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
```

### ARIA Labels

```tsx
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>
```

---

## Do's and Don'ts

### Do's

✅ Use theme tokens (`--primary`, `--foreground`, etc.) instead of hardcoded colors  
✅ Maintain consistent spacing (use Tailwind's scale)  
✅ Use `rounded-full` for buttons and pills  
✅ Use `rounded-lg` or `rounded-xl` for cards  
✅ Provide hover states for interactive elements  
✅ Use semantic HTML (`<button>`, `<a>`, `<nav>`, etc.)  
✅ Test in both light and dark mode  

### Don'ts

❌ Don't use arbitrary colors (e.g., `text-blue-500`) — stick to theme  
❌ Don't mix different border radius values randomly  
❌ Don't nest cards inside cards (use sections instead)  
❌ Don't use multiple accent colors fighting each other  
❌ Don't forget dark mode support  
❌ Don't skip loading/empty/error states  
❌ Don't use raw `<button>` or `<input>` when shadcn components exist  

---

## Examples

### Auth Screen

```tsx
<div className="min-h-screen flex items-center justify-center bg-background p-4">
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-2xl">Sign In</CardTitle>
      <CardDescription>Enter your credentials to access your dashboard</CardDescription>
    </CardHeader>
    <CardContent>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </CardContent>
  </Card>
</div>
```

### Empty State

```tsx
<div className="text-center py-16">
  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
    <Inbox className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
  <p className="text-muted-foreground mb-6">
    Start by booking your first service
  </p>
  <Button>
    <Link href="/booking">Book Now</Link>
  </Button>
</div>
```

### Error State

```tsx
<div className="text-center py-16">
  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
    <AlertCircle className="h-8 w-8 text-destructive" />
  </div>
  <h3 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h3>
  <p className="text-muted-foreground mb-6">
    We couldn't load your data. Please try again.
  </p>
  <Button variant="outline" onClick={() => window.location.reload()}>
    Retry
  </Button>
</div>
```

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Lucide Icons](https://lucide.dev/icons/)
