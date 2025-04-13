"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, Image as ImageIcon, Coffee, Clock, Upload, Plus, Settings, LogOut } from "lucide-react"
import React from "react"
import Header from "@/components/layout/header"
import { useSiteData } from "@/lib/data-context"
import { Event, Artwork, CafeItem, DayHours } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { 
  createEvent, deleteEvent, 
  createArtwork, deleteArtwork, updateArtwork, 
  createCafeItem, deleteCafeItem,
  updateHours
} from "@/lib/supabase-service"
import DatabaseManager from "./components/DatabaseManager"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function AdminDashboard() {
  const router = useRouter()
  const { 
    events, setEvents,
    artworks, setArtworks,
    cafeItems, setCafeItems,
    openingHours, setOpeningHours, updateOpeningHours
  } = useSiteData()
  const [activeTab, setActiveTab] = useState("events")

  // Function to resize image to reduce file size
  const resizeImage = (file: File, maxWidth = 800, maxHeight = 600): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const image = new window.Image();
        image.onload = () => {
          // Calculate new dimensions
          let width = image.width;
          let height = image.height;
          
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * maxWidth / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * maxHeight / height);
              height = maxHeight;
            }
          }
          
          // Create canvas and draw resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(image, 0, 0, width, height);
          
          // Get data URL with reduced quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        image.src = readerEvent.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: "",
    date: "",
    time: "",
    description: "",
    image: ""
  })

  const [newArtwork, setNewArtwork] = useState<Omit<Artwork, 'id'>>({
    title: "",
    artist: "",
    medium: "",
    description: "",
    image: "",
    featured: false
  })

  const [newCafeItem, setNewCafeItem] = useState<Omit<CafeItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'drink',
  })

  // File Upload States
  const [eventImagePreview, setEventImagePreview] = useState<string | null>(null)
  const [artworkImagePreview, setArtworkImagePreview] = useState<string | null>(null)
  const eventFileInputRef = useRef<HTMLInputElement>(null)
  const artworkFileInputRef = useRef<HTMLInputElement>(null)

  // Event Handlers
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEvent(prev => ({ ...prev, [name]: value }))
  }
  
  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      // Resize image before storing it
      const resizedImage = await resizeImage(file);
      setEventImagePreview(resizedImage);
      setNewEvent(prev => ({ ...prev, image: resizedImage }));
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }
  
  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      alert("Please fill in all required fields (title, date, and time)")
      return
    }
    
    try {
      await createEvent(newEvent)
      
      setNewEvent({
        title: "",
        date: "",
        time: "",
        description: "",
        image: ""
      })
      setEventImagePreview(null)
      if (eventFileInputRef.current) {
        eventFileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error adding event:", error)
    }
  }
  
  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id)
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }
  
  // Artwork Handlers
  const handleArtworkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewArtwork(prev => ({ ...prev, [name]: value }))
  }
  
  const handleArtworkImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      // Resize image before storing it
      const resizedImage = await resizeImage(file);
      setArtworkImagePreview(resizedImage);
      setNewArtwork(prev => ({ ...prev, image: resizedImage }));
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }
  
  const handleAddArtwork = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newArtwork.title || !newArtwork.artist) {
      alert("Please fill in all required fields (title and artist name)")
      return
    }
    
    try {
      const result = await createArtwork(newArtwork)
      if (!result) throw new Error('Failed to create artwork')
      
      setNewArtwork({
        title: "",
        artist: "",
        medium: "",
        description: "",
        image: "",
        featured: false
      })
      setArtworkImagePreview(null)
      if (artworkFileInputRef.current) {
        artworkFileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error adding artwork:", error)
      alert(error instanceof Error ? error.message : "Failed to add artwork. Please try again.")
    }
  }
  
  const handleDeleteArtwork = async (id: string) => {
    try {
      await deleteArtwork(id)
    } catch (error) {
      console.error("Error deleting artwork:", error)
    }
  }
  
  // Café Item Handlers
  const handleCafeItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewCafeItem(prev => ({ ...prev, [name]: value }))
  }
  
  const handleAddCafeItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newCafeItem.name || newCafeItem.price <= 0) {
      alert("Please fill in all required fields with valid values")
      return
    }
    
    try {
      await createCafeItem(newCafeItem)
      
      setNewCafeItem({
        name: "",
        category: "drink" as const,
        price: 0,
        description: ""
      })
    } catch (error) {
      console.error("Error adding cafe item:", error)
    }
  }
  
  const handleDeleteCafeItem = async (id: string) => {
    try {
      await deleteCafeItem(id)
    } catch (error) {
      console.error("Error deleting cafe item:", error)
    }
  }
  
  // Opening Hours Handlers
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const day = name.split('.')[0] as keyof typeof openingHours
    const field = name.split('.')[1] as keyof DayHours
    
    if (field === 'closed') {
      // Handle checkbox for 'closed' property
      setOpeningHours(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [field]: e.target.checked
        }
      }))
    } else {
      // Handle text inputs for 'open' and 'close' properties
      setOpeningHours(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [field]: value
        }
      }))
    }
  }
  
  const handleUpdateHours = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const success = await updateOpeningHours(openingHours)
      if (success) {
        alert("Opening hours updated successfully!")
      } else {
        alert("Failed to update opening hours. Please try again.")
      }
    } catch (error) {
      console.error("Error updating hours:", error)
      alert("Failed to update opening hours. Please try again.")
    }
  }
  
  // Toggle artwork featured status
  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      // Find the artwork in the current state
      const artwork = artworks.find(a => a.id === id);
      if (artwork) {
        // Update with the entire artwork object
        await updateArtwork(artwork.id, { featured });
      }
    } catch (error) {
      console.error("Error toggling featured status:", error)
    }
  }

  const handleLogout = () => {
    document.cookie = "adminLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.push("/admin/login")
  }

  // Add state for edit mode
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null)
  const [editingCafeItem, setEditingCafeItem] = useState<CafeItem | null>(null)
  const [showAddForm, setShowAddForm] = useState<'events' | 'artworks' | 'cafe' | null>(null)

  // Function to handle starting edit mode
  const handleStartEdit = (item: Event | Artwork | CafeItem, type: 'events' | 'artworks' | 'cafe') => {
    if (type === 'events') {
      setEditingEvent(item as Event)
      setShowAddForm('events')
    } else if (type === 'artworks') {
      setEditingArtwork(item as Artwork)
      setShowAddForm('artworks')
    } else if (type === 'cafe') {
      setEditingCafeItem(item as CafeItem)
      setShowAddForm('cafe')
    }
  }

  // Function to handle canceling edit/add mode
  const handleCancel = () => {
    setEditingEvent(null)
    setEditingArtwork(null)
    setEditingCafeItem(null)
    setShowAddForm(null)
    setEventImagePreview(null)
    setArtworkImagePreview(null)
    setNewEvent({
      title: "",
      date: "",
      time: "",
      description: "",
      image: ""
    })
    setNewArtwork({
      title: "",
      artist: "",
      medium: "",
      description: "",
      image: "",
      featured: false
    })
    setNewCafeItem({
      name: "",
      description: "",
      price: 0,
      category: "drink"
    })
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/art-space-logo.jpg"
                alt="Art Space Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1 className="text-xl font-bold text-[#3d4f39]">Admin Dashboard</h1>
            </div>
            <Button
              variant="ghost"
              className="text-[#3d4f39] hover:bg-[#3d4f39]/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="events" className="space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="events" className="flex items-center space-x-2 data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white">
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="artworks" className="flex items-center space-x-2 data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white">
                <ImageIcon className="h-5 w-5" />
                <span>Artworks</span>
              </TabsTrigger>
              <TabsTrigger value="cafe" className="flex items-center space-x-2 data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white">
                <Coffee className="h-5 w-5" />
                <span>Café Menu</span>
              </TabsTrigger>
              <TabsTrigger value="hours" className="flex items-center space-x-2 data-[state=active]:bg-[#3d4f39] data-[state=active]:text-white">
                <Clock className="h-5 w-5" />
                <span>Hours</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#3d4f39]">Events Management</h2>
              <Button 
                className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
                onClick={() => setShowAddForm('events')}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Event
              </Button>
            </div>

            {showAddForm === 'events' && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold text-[#3d4f39] mb-4">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <Input
                      type="text"
                      name="title"
                      value={editingEvent?.title || newEvent.title}
                      onChange={handleEventChange}
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <Input
                        type="date"
                        name="date"
                        value={editingEvent?.date || newEvent.date}
                        onChange={handleEventChange}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time</label>
                      <Input
                        type="time"
                        name="time"
                        value={editingEvent?.time || newEvent.time}
                        onChange={handleEventChange}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editingEvent?.description || newEvent.description}
                      onChange={handleEventChange}
                      className="w-full p-2 border rounded-md"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input
                      type="file"
                      ref={eventFileInputRef}
                      accept="image/*"
                      onChange={handleEventImageUpload}
                      className="w-full"
                    />
                    {(eventImagePreview || editingEvent?.image) && (
                      <div className="mt-2 relative w-full h-40">
                        <Image
                          src={eventImagePreview || editingEvent?.image || ""}
                          alt="Preview"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
                    >
                      {editingEvent ? 'Save Changes' : 'Add Event'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#3d4f39] mb-2">{event.title}</h3>
                    <p className="text-[#3d4f39]/70 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#3d4f39]/60">{event.date}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartEdit(event, 'events')}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artworks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#3d4f39]">Artworks Management</h2>
              <Button 
                className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
                onClick={() => setShowAddForm('artworks')}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Artwork
              </Button>
            </div>

            {showAddForm === 'artworks' && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold text-[#3d4f39] mb-4">
                  {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
                </h3>
                <form onSubmit={handleAddArtwork} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      type="text"
                      name="title"
                      value={editingArtwork?.title || newArtwork.title}
                      onChange={handleArtworkChange}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Artist</label>
                    <Input
                      type="text"
                      name="artist"
                      value={editingArtwork?.artist || newArtwork.artist}
                      onChange={handleArtworkChange}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Medium</label>
                    <Input
                      type="text"
                      name="medium"
                      value={editingArtwork?.medium || newArtwork.medium}
                      onChange={handleArtworkChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editingArtwork?.description || newArtwork.description}
                      onChange={handleArtworkChange}
                      className="w-full p-2 border rounded-md"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input
                      type="file"
                      ref={artworkFileInputRef}
                      accept="image/*"
                      onChange={handleArtworkImageUpload}
                      className="w-full"
                    />
                    {(artworkImagePreview || editingArtwork?.image) && (
                      <div className="mt-2 relative w-full h-40">
                        <Image
                          src={artworkImagePreview || editingArtwork?.image || ""}
                          alt="Preview"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={editingArtwork?.featured || newArtwork.featured}
                      onChange={(e) => {
                        if (editingArtwork) {
                          handleToggleFeatured(editingArtwork.id, e.target.checked)
                        } else {
                          setNewArtwork(prev => ({ ...prev, featured: e.target.checked }))
                        }
                      }}
                      className="rounded text-[#3d4f39]"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Show on home page
                    </label>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
                    >
                      {editingArtwork ? 'Save Changes' : 'Add Artwork'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#3d4f39] mb-2">{artwork.title}</h3>
                    <p className="text-[#3d4f39]/70 mb-2">{artwork.artist}</p>
                    <p className="text-[#3d4f39]/70 mb-4 line-clamp-2">{artwork.description}</p>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={artwork.featured}
                          onChange={(e) => handleToggleFeatured(artwork.id, e.target.checked)}
                          className="rounded text-[#3d4f39]"
                        />
                        <span className="text-sm text-[#3d4f39]/60">
                          Show on home page
                        </span>
                      </label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartEdit(artwork, 'artworks')}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteArtwork(artwork.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cafe" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#3d4f39]">Café Menu Management</h2>
              <Button 
                className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
                onClick={() => setShowAddForm('cafe')}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Menu Item
              </Button>
            </div>

            {showAddForm === 'cafe' && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold text-[#3d4f39] mb-4">
                  {editingCafeItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                <form onSubmit={handleAddCafeItem} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={editingCafeItem?.name || newCafeItem.name}
                      onChange={handleCafeItemChange}
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        name="category"
                        value={editingCafeItem?.category || newCafeItem.category}
                        onChange={handleCafeItemChange}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="drink">Drinks</option>
                        <option value="food">Food</option>
                        <option value="dessert">Desserts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Price</label>
                      <Input
                        type="number"
                        name="price"
                        value={editingCafeItem?.price || newCafeItem.price}
                        onChange={(e) => {
                          const numValue = parseFloat(e.target.value) || 0
                          if (editingCafeItem) {
                            setEditingCafeItem({ ...editingCafeItem, price: numValue })
                          } else {
                            setNewCafeItem(prev => ({ ...prev, price: numValue }))
                          }
                        }}
                        className="w-full"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editingCafeItem?.description || newCafeItem.description}
                      onChange={handleCafeItemChange}
                      className="w-full p-2 border rounded-md"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
                    >
                      {editingCafeItem ? 'Save Changes' : 'Add Item'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cafeItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[#3d4f39] mb-2">{item.name}</h3>
                      <p className="text-[#3d4f39]/70 mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#3d4f39]/60">{item.category}</span>
                        <span className="text-sm font-semibold text-[#3d4f39]">${item.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartEdit(item, 'cafe')}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCafeItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hours" className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-[#3d4f39] mb-6">Opening Hours</h2>
              <div className="grid gap-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center justify-between p-4 bg-[#f8f5f2] rounded-lg">
                    <span className="font-medium text-[#3d4f39]">{day}</span>
                    <div className="flex items-center space-x-4">
                      <input
                        type="time"
                        className="border border-[#d9bfa4]/30 rounded-md px-3 py-2"
                        defaultValue="09:00"
                      />
                      <span className="text-[#3d4f39]/60">to</span>
                      <input
                        type="time"
                        className="border border-[#d9bfa4]/30 rounded-md px-3 py-2"
                        defaultValue="18:00"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6 bg-[#3d4f39] hover:bg-[#3d4f39]/90">
                Save Changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 